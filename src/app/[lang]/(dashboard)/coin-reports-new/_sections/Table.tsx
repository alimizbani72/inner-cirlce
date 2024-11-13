"use client";

import { DataGrid } from "@/components/datagrid";
import { Icon } from "@/components/icons";
import { useIsMobile, useResponsive } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import Toggle from "@app/_components/Toggle";
import { mockData } from "@dashboard/coin-reports-new/_sections/mockData";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
  buttonClasses,
  outlinedInputClasses,
} from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";

import { type FC, useMemo, useState } from "react";
import { FilterModal } from "./FilterModal";

interface TableProps {}

const CoinReportTable: FC<TableProps> = () => {
  const { t } = useTranslate();
  const buttons = useMemo(
    () => [
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.allCoins")}</Typography>,
        value: "all-coins",
      },
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.preSale")}</Typography>,
        value: "pre-Sale",
      },
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.favorites")}</Typography>,
        value: "favorites",
      },
    ],
    [t]
  );
  const timeFrames = useMemo(
    () => [
      {
        label: <Typography variant="p2-medium">1H</Typography>,
        value: "1",
      },
      {
        label: <Typography variant="p2-medium">24H</Typography>,
        value: "24",
      },
      {
        label: <Typography variant="p2-medium">7Days</Typography>,
        value: "7",
      },
    ],
    [t]
  );
  const [value, setValue] = useState<any>(buttons[0].value);
  const [timeFrame, setTimeFrame] = useState<any>(timeFrames[0].value);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const isMobile = useIsMobile();
  const lgBreakPoint = useResponsive("up", "lg");

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  const handleChangeTimeFrame = (newValue: any) => {
    setTimeFrame(newValue);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        headerName: t("coinReportTabTable.name"),
        field: "name",
        sortable: false,
        filterable: false,
        minWidth: 250,
        renderCell: (params: GridRenderCellParams<{ logo: string; name: string }>) => (
          <Box display="flex" alignItems="center" gap={1} sx={{ "&:hover > div": { visibility: "visible" } }}>
            <Box width={24} sx={{ visibility: "hidden", cursor: "pointer" }}>
              <Icon name="Star--colorful" />
            </Box>
            <Image src={"/assets/svg/btc.svg"} width={24} height={24} alt="logo" />
            {params?.value}
          </Box>
        ),
      },
      {
        headerName: t("coinReportTabTable.package"),
        field: "package",
        sortable: false,
        resizable: false,
      },
      {
        headerName: t("coinReportTabTable.category"),
        field: "category",
        sortable: false,
        resizable: false,
        minWidth: 150,
      },
      {
        headerName: t("coinReportTabTable.cmr"),
        field: "cmr",
        sortable: true,
        resizable: false,
      },
      {
        headerName: t("coinReportTabTable.eeSignal"),
        field: "ee_signal",
        minWidth: 130,
        resizable: false,
      },
      {
        headerName: t("coinReportTabTable.potentialMultiplicator"),
        field: "potential_multiplicator",
        minWidth: 130,
        resizable: false,
      },
      {
        headerName: t("coinReportTabTable.rtl"),
        field: "rtl",
        resizable: false,
      },
      {
        headerName: t("coinReportTabTable.riskLevel"),
        field: "risk_level",
        minWidth: 130,
        resizable: false,
      },
      {
        headerName: t("coinReportTabTable.currentPrice"),
        field: "current_price",
        minWidth: 150,
        resizable: false,
      },
    ],
    [t]
  );

  const rightHeader = useMemo(
    () => (
      <Stack direction={{ xs: "column", md: "row-reverse" }} width={{ xs: "100%", md: "unset" }} spacing={2}>
        {!isMobile && (
          <Button
            variant="outlined"
            startIcon={<Icon name="Filter" />}
            sx={{ [`& .${buttonClasses.startIcon}`]: { mr: 2 } }}
            onClick={() => setOpenFilterModal(true)}
          >
            {t("coinReportTable.filter")}
          </Button>
        )}
        <TextField
          placeholder="Search"
          size="small"
          InputProps={{ startAdornment: <Icon name="Search" /> }}
          fullWidth
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
            justifyContent={{ xs: "space-between" }}
            width={{ xs: "100%", md: "unset" }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {timeFrames?.map((time, index) => (
                <>
                  <Typography
                    variant="p2-medium"
                    onClick={() => handleChangeTimeFrame(time.value)}
                    sx={{
                      cursor: "pointer",
                      height: 24,
                      px: 1,
                      ...(timeFrame === time.value && {
                        bgcolor: "dark.3",
                        borderRadius: 1.5,
                      }),
                    }}
                  >
                    {time.label}
                  </Typography>
                  {index !== timeFrames?.length - 1 && <Box width={4} height={4} bgcolor="dark.3" />}
                </>
              ))}
            </Box>
            <Button variant="text" endIcon={<Icon name="Close" />} sx={{ p: 0, minWidth: 100 }}>
              2 {t("coinReportTable.filters")}
            </Button>
          </Box>
        )}
      </Stack>
    ),
    [isMobile, lgBreakPoint]
  );

  const leftHeader = useMemo(
    () => (
      <Box
        display="flex"
        justifyContent="space-between"
        width={{ xs: "100%", md: "inherit" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Box display="flex" alignItems={"center"} gap={2} sx={{ flexDirection: { xs: "column", sm: "row" } }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" width={{ xs: "100%", md: "unset" }}>
            <Typography variant="p1-semi-bold">{t("coinReportTable.allCoins")}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CircularProgress size={20} variant="determinate" value={40} color="success" />
            <Typography variant="caption-medium" color="grey.light" ml={1} minWidth="max-content">
              {t("coinReportTable.nextUpdateIn")}
            </Typography>
            <Typography variant="caption-medium" ml={0.5}>
              00:48:03
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton
            sx={{
              path: {
                stroke: (theme) => theme.palette.grey.light,
              },
            }}
            onClick={() => setOpenFilterModal(true)}
          >
            <Icon name="Filter" color="grey.light" />
          </IconButton>
        )}
      </Box>
    ),
    [isMobile]
  );

  return (
    <Stack
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
      <Stack pl={{ md: 4, xs: 3 }} pb={3} alignItems="flex-start" maxWidth="100vw">
        <Stack pr={{ md: 4, xs: 3 }}>
          <Toggle setValue={handleChange} buttons={buttons} value={value} />
        </Stack>
      </Stack>

      <Stack pl={{ md: 4, xs: 3 }} pb={3}>
        <DataGrid
          rows={mockData}
          columns={columns}
          autosizeOptions={{
            includeHeaders: false,
            includeOutliers: false,
            outliersFactor: 1,
            expand: true,
          }}
          headerSx={{
            gap: 2,
            alignItems: { md: "unset", xs: "flex-start" },
          }}
          rightHeader={rightHeader}
          leftHeader={leftHeader}
        />
      </Stack>
      {openFilterModal && <FilterModal onClose={() => setOpenFilterModal(false)} />}
    </Stack>
  );
};

export default CoinReportTable;
