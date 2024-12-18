import { useTranslate } from "@/locales";
import CryptoIcon from "@app/_components/CryptoIcon";
import RiskLevelHandler from "@dashboard/coin-reports/_sections/table/columns/RiskLevelHandler";
import type { PortfolioCoin } from "@minecraft/requests";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useTranslate();

  const columns = useMemo(
    () => [
      {
        title: t("portfolioStrategyTable.name"),
        sortable: true,
        fieldName: "name",
        modify: (row: PortfolioCoin) => (
          <CryptoIcon logoUrl={row?.logo || ""} name={row?.name || ""} symbol={row?.symbol || ""} />
        ),
      },
      {
        title: t("portfolioStrategyTable.signal"),
        sortable: true,
        fieldName: "signal",
        modify: (row: PortfolioCoin) => row.ee_signal,
      },
      {
        title: t("portfolioStrategyTable.cmr"),
        sortable: true,
        fieldName: "cmr",
        modify: (row: PortfolioCoin) => row.cmr?.slice(0, 4),
      },
      {
        title: t("portfolioStrategyTable.category"),
        modify: (row: PortfolioCoin) => row.category?.replaceAll("_", " "),
      },
      {
        title: t("portfolioStrategyTable.riskLevel"),
        modify: (row: PortfolioCoin) => <RiskLevelHandler value={row.risk_level || ""} />,
      },
      {
        title: t("portfolioStrategyTable.potentialMultiplier"),
        sortable: true,
        fieldName: "potentialMultiplier",
        modify: (row: PortfolioCoin) => `${row.potential_multiplier?.slice(0, 5)}x`,
      },
      {
        title: t("portfolioStrategyTable.distribution"),
        sortable: true,
        fieldName: "distribution",
        modify: (row: any) => `${row.distribution}%`,
      },
      {
        title: t("portfolioStrategyTable.gains"),
        sortable: true,
        fieldName: "gains",
        modify: (row: PortfolioCoin) => row.gains?.slice(0, 4),
      },
    ],
    [t]
  );

  return { columns };
};
