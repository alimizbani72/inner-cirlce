import { Icon } from "@/components/icons";
import { useIsMobile, useResponsive } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  buttonClasses,
  outlinedInputClasses,
} from "@mui/material";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { defaultValueSort, timeFrameOptions } from "../consts";
import type { FilterFormDataType } from "../types";
import CountDownUpdateTime from "./CountDownUpdateTime";

interface HeaderProps {
  onFilterClick: () => void;
  setFilters: Dispatch<SetStateAction<FilterFormDataType>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filters?: FilterFormDataType;
  nextUpdateTime?: number;
  onNextUpdate: () => void;
}

export const Header = ({
  onFilterClick,
  setFilters,
  setSearchValue,
  filters,
  nextUpdateTime,
  onNextUpdate,
}: HeaderProps) => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const lgBreakPoint = useResponsive("up", "lg");
  const handleTimeFrameClick = (time: { value: string }) => {
    setFilters((prev) => ({ ...prev, timeFrame: time.value }));
  };

  const filterValue = useMemo(() => {
    let value = {};
    for (const key in filters) {
      if (!["timeFrame", "sorts"].includes(key) && filters[key as keyof FilterFormDataType]?.length) {
        value = { ...value, [key]: filters[key as keyof FilterFormDataType] };
      }
    }
    return value;
  }, [filters]);

  const hasActiveFilters = !!Object.keys(filterValue).length;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2.5}
      py={3}
      width="100%"
      flexDirection={isMobile ? "column" : "row"}
      sx={{ gap: 2, alignItems: { md: "unset", xs: "flex-start" } }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width={{ xs: "100%", md: "inherit" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Box display="flex" alignItems="center" gap={2} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
          <Typography variant="p1-semi-bold">{t("coinReportTable.allCoins")}</Typography>
          {nextUpdateTime && <CountDownUpdateTime onNextUpdate={onNextUpdate} updateTime={nextUpdateTime} />}
        </Box>

        {isMobile && (
          <IconButton
            sx={{
              path: {
                stroke: (theme) => theme.palette.grey.light,
              },
            }}
            onClick={onFilterClick}
          >
            <Icon name="Filter" color="grey.light" />
          </IconButton>
        )}
      </Box>

      <Stack direction={{ xs: "column", md: "row-reverse" }} width={{ xs: "100%", md: "unset" }} spacing={2}>
        {!isMobile && (
          <Button
            variant="outlined"
            startIcon={<Icon name="Filter" />}
            sx={{ [`& .${buttonClasses.startIcon}`]: { mr: 2 } }}
            onClick={onFilterClick}
          >
            {t("coinReportTable.filter")}
          </Button>
        )}

        <TextField
          placeholder="Search"
          size="small"
          InputProps={{ startAdornment: <Icon name="Search" /> }}
          fullWidth
          onChange={(event) => setSearchValue(event.target.value)}
          sx={{
            width: { xs: "100%", md: 140 },
            [`& .${outlinedInputClasses.root}`]: {
              borderRadius: "30px !important",
            },
          }}
        />

        {(lgBreakPoint || isMobile) && (
          <Box
            gap={2}
            display="flex"
            alignItems="center"
            flexDirection={{ xs: "row", md: "row-reverse" }}
            justifyContent="space-between"
            width={{ xs: "100%", md: "unset" }}
          >
            <Box display="flex" alignItems="center" gap={1} p={1} bgcolor="dark.3" borderRadius={2.5}>
              {timeFrameOptions?.map((time, index) => (
                <>
                  <Box
                    key={time.value}
                    sx={{
                      ...(filters?.timeFrame === time.value && {
                        bgcolor: "blue.dark",
                        borderRadius: 1.5,
                        px: 1,
                      }),
                    }}
                  >
                    <Typography
                      variant="p2-medium"
                      onClick={() => handleTimeFrameClick(time)}
                      sx={{
                        cursor: "pointer",
                        height: 24,
                        px: 1,
                      }}
                    >
                      {time.label}
                    </Typography>
                  </Box>
                  {index !== timeFrameOptions?.length - 1 && <Box width={4} height={4} bgcolor="dark.3" />}
                </>
              ))}
            </Box>

            {hasActiveFilters && (
              <Button
                variant="text"
                endIcon={<Icon name="Close" />}
                sx={{ p: 0, minWidth: 100 }}
                onClick={() => setFilters({ timeFrame: "24h", sorts: defaultValueSort })}
              >
                {Object.keys(filterValue).length} {t("coinReportTable.filters")}
              </Button>
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
};
