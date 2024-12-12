import { useTranslate } from "@/locales";
import { useMemo } from "react";
import CMRHandler from "./columns/CMRHandler";
import CategoryHandler from "./columns/CategoryHandler";
import NameHandler from "./columns/NameHandler";
import PackageHandler from "./columns/PackageHandler";
import RiskLevelHandler from "./columns/RiskLevelHandler";
import SignalHandler from "./columns/SignalHandler";
import TextHandler from "./columns/TextHandler";

export const useColumns = () => {
  const { t } = useTranslate();

  const columns = useMemo(
    () => [
      {
        title: t("coinReportTabTable.name"),
        sortable: true,
        fieldName: "name",
        modify: (row: any) => <NameHandler {...row} />,
      },
      {
        title: t("coinReportTabTable.package"),
        modify: (row: any) => <PackageHandler name={row?.name} plan={row.plan} />,
      },
      {
        title: t("coinReportTabTable.category"),
        modify: (row: any) => <CategoryHandler slug={row.category} />,
        sortable: true,
        fieldName: "category",
      },
      {
        title: t("coinReportTabTable.cmr"),
        modify: (row: any) => <CMRHandler value={row.cmr} percentChange={row.cmr_change_percentage} />,
      },
      {
        title: t("coinReportTabTable.eeSignal"),
        modify: (row: any) => <SignalHandler value={row.signal} />,
      },
      {
        title: t("coinReportTabTable.potentialMultiplicator"),
        modify: (row: any) => <TextHandler length={5} value={row?.potential_multiplier} suffix="x" />,
      },
      {
        title: t("coinReportTabTable.rtl"),
        modify: (row: any) => <TextHandler length={5} value={row?.rtl} suffix="%" />,
      },
      {
        title: t("coinReportTabTable.riskLevel"),
        modify: (row: any) => <RiskLevelHandler value={row?.risk_level} />,
      },
      {
        title: t("coinReportTabTable.currentPrice"),
        modify: (row: any) => <TextHandler length={8} value={row?.current_price} prefix="$" />,
      },
    ],
    [t]
  );

  return { columns };
};
