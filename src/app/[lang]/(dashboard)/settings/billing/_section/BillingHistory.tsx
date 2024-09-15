import CustomTable from "@/components/CustomTable";
import { fDate } from "@/utils/format-time";
import { toNumber } from "@/utils/toNumber";
import { Button, Stack } from "@mui/material";
import type { FC } from "react";

interface BillingHistoryProps {}

const columns = [
  {
    title: "Invoice number",
    modify: (row: any) => row.invoice_number,
  },
  {
    title: "Invoice Date",
    modify: (row: any) => fDate(toNumber(row.created_at) * 1000, "dd.MM.yyyy"),
  },
  {
    title: "",
    modify: (row: any) => (
      <Stack gap={2}>
        <Button variant="text" href={row.preview}>
          Preview
        </Button>

        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="4" fill="#14162E" />
        </svg>
        <Button variant="text" href={row.preview} download>
          Download
        </Button>
      </Stack>
    ),
  },
];

const BillingHistory: FC<BillingHistoryProps> = () => {
  return (
    <CustomTable
      title="History"
      data={[]}
      columns={columns}
      emptyTitle="You have not any billing history yet"
      emptySubtitle="Track profits, losses and valuation all in one place."
    />
  );
};

export default BillingHistory;
