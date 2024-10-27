"use client";

import CustomTable from "@/components/CustomTable";
import { fDate } from "@/utils/format-time";
import { useFinancialServiceFinancialPaymentsQuery } from "@minecraft/queries";
import type { FC } from "react";
import ActionButtons from "./ActionButtons";
import { useTranslate } from "@/locales";

const columns = [
  {
    title: "Invoice number",
    modify: (row: any) => row.id,
  },
  {
    title: "Invoice Date",
    modify: (row: any) => fDate(row.created_at, "dd.MM.yyyy HH:mm"),
  },
  {
    title: "",
    modify: (row: any) => <ActionButtons row={row} />,
  },
];

const BillingHistory: FC = () => {
  const { t } = useTranslate();
  const { data } = useFinancialServiceFinancialPaymentsQuery({
    opts: JSON.stringify({
      sorts: { created_at: false },
      page: 1,
      per_page: 200,
      filters: { status: ["completed", "manually-completed"] },
    }),
  });

  return (
    <CustomTable
      title={t("billinghistory.history")}
      data={data?.data ?? []}
      columns={columns}
      emptyTitle={t("billinghistory.emptyTitle")}
      emptySubtitle={t("billinghistory.emptySubtitle")}
    />
  );
};

export default BillingHistory;
