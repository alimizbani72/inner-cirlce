"use client";

import CustomTable from "@/components/CustomTable";
import { useTranslate } from "@/locales";
import { fDate } from "@/utils/format-time";
import { Stack } from "@mui/material";
import type { FC } from "react";
import ActionButtons from "./ActionButtons";

/**
 * 🔹 Dummy payments (replaces useGetFinancialPayments)
 */
const dummyPayments = [
  {
    id: "INV-1001",
    created_at: "2026-06-10T14:20:00Z",
  },
  {
    id: "INV-1002",
    created_at: "2026-06-08T09:15:00Z",
  },
  {
    id: "INV-1003",
    created_at: "2026-06-01T18:45:00Z",
  },
];

interface PaymentItem {
  id: string;
  created_at: string;
}

const columns = [
  {
    title: "Invoice number",
    modify: (row: PaymentItem) => row.id,
  },
  {
    title: "Invoice Date",
    modify: (row: PaymentItem) => fDate(row.created_at, "DD.MM.YYYY HH:mm"),
  },
  {
    title: "",
    modify: (row: PaymentItem) => <ActionButtons row={row} />,
  },
];

const BillingHistory: FC = () => {
  const { t } = useTranslate();

  const data = dummyPayments;
  const isLoading = false;

  return (
    <Stack px={{ md: 4, xs: 0 }} pb={3}>
      <Stack alignItems="flex-start" maxWidth="100%">
        <CustomTable
          title={t("billinghistory.history")}
          data={data}
          columns={columns}
          isPending={isLoading}
          containerHeight={isLoading ? undefined : "max-content"}
          emptyTitle={t("billinghistory.emptyTitle")}
          emptySubtitle={t("billinghistory.emptySubtitle")}
        />
      </Stack>
    </Stack>
  );
};

export default BillingHistory;
