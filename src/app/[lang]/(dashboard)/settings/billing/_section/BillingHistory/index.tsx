import CustomTable from "@/components/CustomTable";
import { fDate } from "@/utils/format-time";
import { useFinancialServiceFinancialPaymentsQuery } from "@minecraft/queries";
import type { FC } from "react";
import ActionButtons from "./ActionButtons";

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
      title="History"
      data={data?.data ?? []}
      columns={columns}
      emptyTitle="You have not any billing history yet"
      emptySubtitle="Track profits, losses and valuation all in one place."
    />
  );
};

export default BillingHistory;
