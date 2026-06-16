import { useTranslate } from "@/locales";
import CryptoIcon from "@app-components/CryptoIcon";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import RiskLevelHandler from "./RiskLevelHandler";

export const useColumns = () => {
  const { t } = useTranslate();

  const columns = useMemo(
    () => [
      {
        title: t("portfolioStrategyTable.name"),
        sortable: true,
        fieldName: "name",
        modify: (row: any) => (
          <Stack pl={2}>
            <CryptoIcon
              logoUrl={row?.logo || ""}
              name={row?.name || ""}
              symbol={row?.symbol || ""}
            />
          </Stack>
        ),
      },
      {
        title: t("portfolioStrategyTable.signal"),
        sortable: true,
        fieldName: "ee_signal",
        modify: (row: any) => row.ee_signal,
      },
      {
        title: t("portfolioStrategyTable.cmr"),
        sortable: true,
        fieldName: "cmr",
        modify: (row: any) => row.cmr?.slice(0, 4),
      },
      {
        title: t("portfolioStrategyTable.category"),
        modify: (row: any) => row.category?.replaceAll("_", " "),
      },
      {
        title: t("portfolioStrategyTable.riskLevel"),
        modify: (row) => <RiskLevelHandler value={row.risk_level || ""} />,
      },
      {
        title: t("portfolioStrategyTable.potentialMultiplier"),
        sortable: true,
        fieldName: "potential_multiplier",
        modify: (row) => `${row.potential_multiplier?.slice(0, 5)}x`,
      },
      {
        title: t("portfolioStrategyTable.distribution"),
        sortable: true,
        fieldName: "distribution",
        modify: (row) => `${row.distribution}%`,
      },
      {
        title: t("portfolioStrategyTable.gains"),
        sortable: true,
        fieldName: "gains",
        modify: (row: any) => row.gains?.slice(0, 4),
      },
    ],
    [t],
  );

  return { columns };
};
