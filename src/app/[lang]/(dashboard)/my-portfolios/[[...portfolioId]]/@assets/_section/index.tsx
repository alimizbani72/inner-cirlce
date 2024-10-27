"use client";
import Scrollbar from "@/components/Scrollbar";
import { useAppSelector } from "@/lib/hooks";
import { Stack, Typography } from "@mui/material";
import CryptoIcon from "./CryptoIcons";
import CustomAssetTable from "./CustomAssetTable";
import numeral from "numeral";
import MoreTableAction from "./MoreTableAction";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useIsMobile } from "@/hooks/use-responsive";
import { useMemo } from "react";
import { useTranslate } from "@/locales";
import { formatTitle } from "@/utils/toNumber";
import usePortfolioData from "../../_section/hook/usePortfolioData";
import { Icon } from "@/components/icons";
import ValueWithSymbol from "./ValueWithSymbol";

const AssetsTable = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const isCollapsed = useAppSelector(isSidebarCollapsed);

  const { portfolioId, selectedPortfolio, isLoading } = usePortfolioData();

  const columns = useMemo(
    () => [
      {
        title: t("assetsTable.name"),
        field: "name",
        modify: (row: any) => (
          <Stack direction={"row"} alignItems={"center"} sx={{ cursor: "pointer" }} onClick={row.onClick} gap={1}>
            {portfolioId && <MoreTableAction symbol={row.row.symbol} />}
            <Stack
              direction={"row"}
              sx={{ width: "100%" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={1}
            >
              <CryptoIcon name={row.row.name} symbol={row.row.symbol} logoUrl={row.row.logo} />
              <Icon name={row.isOpen ? "arrow-colorfull-up" : "arrow-colorfull-down"} />
            </Stack>
          </Stack>
        ),
      },
      {
        title: t("assetsTable.currentHoldings"),
        field: "current_holdings",
        modify: (row: any) => <ValueWithSymbol value={row.current_holdings} symbol={row.symbol} />,
      },
      {
        title: formatTitle(t("assetsTable.actualPrice")),
        field: "actual_price",
        modify: (row: any) => `$${numeral(row.actual_price).format("0,0.00")}`,
      },
      {
        title: formatTitle(t("assetsTable.actualValue")),
        field: "actual_value",
        modify: (row: any) => (
          <Typography variant="p2-medium" color={parseFloat(row.actual_value) <= 0 ? "error.main" : "success.main"}>
            ${numeral(row.actual_value).format("0,0.00")}
          </Typography>
        ),
      },
      // {
      //   title: t("assetsTable.exitProximity"),
      //   field: "exitProximity",
      //   modify: (row: any) => (
      //     <Typography variant="p2-medium" color={parseFloat(row.exitProximity) <= 0 ? "error.main" : "success.main"}>
      //       {row.exitProximity}
      //     </Typography>
      //   ),
      // },
      {
        title: formatTitle(t("assetsTable.distribution"), "%"),
        field: "distribution",
        modify: (row: any) => `${Math.floor(row.distribution)} %`,
      },
      {
        title: t("assetsTable.totalBought"),
        field: "total_purchased",
        modify: (row: any) => <ValueWithSymbol value={row.total_purchased} symbol={row.symbol} />,
      },
      {
        title: t("assetsTable.totalSold"),
        field: "total_sold",
        modify: (row: any) => <ValueWithSymbol value={row.total_sold} symbol={row.symbol} />,
      },
      {
        title: formatTitle(t("assetsTable.totalInvest")),
        field: "total_invested",
        modify: (row: any) => `$${numeral(row.total_invested).format("0,0.00")}`,
      },
      {
        title: formatTitle(t("assetsTable.unrealizedpnl")),
        field: "unrealized_pnl",
        modify: (row: any) => `$${numeral(row.unrealized_pnl).format("0,0.00")}`,
      },
      {
        title: formatTitle(t("assetsTable.realizedPNL")),
        field: "realized_pnl",
        modify: (row: any) => (
          <Typography variant="p2-medium" color={parseFloat(row.realized_pnl) <= 0 ? "error.main" : "success.main"}>
            ${numeral(row.realized_pnl).format("0,0.00")}
          </Typography>
        ),
      },
    ],
    [t]
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
      <Stack pl={{ xs: 3, md: 4 }} pb={5}>
        <Scrollbar options={{ scrollbars: { clickScroll: true, autoHide: "never" } }}>
          <Stack
            alignItems="flex-start"
            maxWidth={isMobile ? "calc(100vw - 48px)" : `calc(100vw - ${isCollapsed ? "136px" : "281px"})`}
            sx={{
              "> div": {
                borderBottomRightRadius: { xs: undefined, md: 0 },
                borderTopRightRadius: { xs: undefined, md: 0 },
                borderRight: { xs: undefined, md: 0 },
              },
            }}
          >
            <CustomAssetTable
              isPending={isLoading}
              minWidthCell={160}
              title={"Assets"}
              columns={columns}
              data={((selectedPortfolio?.data as any)?.assets as any) ?? []}
            />
          </Stack>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

export default AssetsTable;
