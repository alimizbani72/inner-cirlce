"use client";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { formatTitle } from "@/utils/toNumber";
import { Stack } from "@mui/material";
import numeral from "numeral";
import { useMemo } from "react";
import usePortfolioData from "../../_section/hook/usePortfolioData";
import ColoredTypography from "./ColoredTypography";
import CryptoIcon from "./CryptoIcons";
import CustomAssetTable from "./CustomAssetTable";
import Distribution from "./Distribution";
import MoreTableAction from "./MoreTableAction";
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
            {portfolioId && <MoreTableAction slug={row.row.slug} />}
            <Stack
              direction={"row"}
              sx={{ width: "100%" }}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={1}
            >
              <CryptoIcon name={row.row.name} symbol={row.row.symbol} logoUrl={row.row.logo} />
              {portfolioId && (
                <Stack>
                  <Icon name={row.isOpen ? "arrow-colorfull-up" : "arrow-colorfull-down"} />
                </Stack>
              )}
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
        modify: (row: any) => <ColoredTypography value={row.actual_price} customColor="white" />,
      },
      {
        title: formatTitle(t("assetsTable.actualValue")),
        field: "actual_value",
        modify: (row: any) => <ColoredTypography value={row.actual_value} />,
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
        modify: (row: any) => <Distribution value={row.distribution} />,
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
        modify: (row: any) => <ColoredTypography value={row.unrealized_pnl} />,
      },
      {
        title: formatTitle(t("assetsTable.realizedPNL")),
        field: "realized_pnl",
        modify: (row: any) => <ColoredTypography value={row.realized_pnl} />,
      },
    ],
    [t]
  );

  return (
    <Stack pl={{ xs: 0, md: 4 }} pb={5}>
      <Stack
        alignItems="flex-start"
        maxWidth={isMobile ? "100vw" : `calc(100vw - ${isCollapsed ? "167px" : "311px"})`}
        sx={{
          ...(!isMobile
            ? {}
            : {
                "> div": {
                  borderRadius: 0,
                  borderRight: 0,
                  borderLeft: 0,
                },
              }),
        }}
      >
        <CustomAssetTable
          isPending={isLoading}
          minWidthCell={160}
          title={t("assetsTable.assets")}
          columns={columns}
          data={((selectedPortfolio?.data as any)?.assets as any) ?? []}
        />
      </Stack>
    </Stack>
  );
};

export default AssetsTable;
