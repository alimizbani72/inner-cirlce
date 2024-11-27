import { Icon } from "@/components/icons";
import { useIsMobile, useResponsive } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { Badge, type BadgeProps, Box, Stack, TextField, Typography, outlinedInputClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type Dispatch, Fragment, type SetStateAction, useMemo } from "react";
import { timeFrameOptions } from "../consts";
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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 35,
    top: 12,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "0 4px",
  },
}));

export const Header = ({
  onFilterClick,
  setFilters,
  setSearchValue,
  filters,
  nextUpdateTime,
  onNextUpdate,
}: HeaderProps) => {
  const { t } = useTranslate();
  const isLarge = useResponsive("up", "lg");
  const isMobile = useIsMobile();
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
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent={"space-between"}
      sx={{ width: "100%", p: 3 }}
      gap={3}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2} sx={{ width: "100%" }}>
        <Typography variant="p1-semi-bold" sx={{ textAlign: "center" }}>
          {t("coinReportTable.allCoins")}
        </Typography>
        {nextUpdateTime && (
          <CountDownUpdateTime
            onNextUpdate={() => {
              onNextUpdate();
            }}
            updateTime={nextUpdateTime}
          />
        )}
        <Stack
          direction={"row"}
          alignItems="center"
          sx={{ p: 1, height: 40, bgcolor: "dark.3", borderRadius: 2.5, ml: "auto" }}
          gap={1}
        >
          {timeFrameOptions?.map((time, index) => (
            <Fragment key={time.value}>
              <Box
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
              {index !== timeFrameOptions?.length - 1 && (
                <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "grey.light" }} />
              )}
            </Fragment>
          ))}
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <TextField
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <Box sx={{ path: { stroke: (theme) => theme.palette.grey.dark } }}>
                <Icon name="Search" />
              </Box>
            ),
          }}
          fullWidth
          onChange={(event) => setSearchValue(event.target.value)}
          sx={{
            width: { xs: "100%", md: 140 },
            [`& .${outlinedInputClasses.root}`]: {
              borderRadius: "30px !important",
              bgcolor: "dark.3",
            },
          }}
        />
        <Stack
          direction={"row"}
          alignItems={"center"}
          onClick={onFilterClick}
          sx={{ borderRadius: 3, border: "1px solid", borderColor: "dark.3", px: 3, py: 1, gap: 0.5 }}
        >
          <StyledBadge badgeContent={Object.keys(filterValue).length} color="primary" invisible={!hasActiveFilters}>
            <Icon name="Filter" />
          </StyledBadge>
          {isLarge && <Typography variant="p2-medium"> {t("coinReportTable.filter")}</Typography>}
        </Stack>
      </Stack>
    </Stack>
  );
};
