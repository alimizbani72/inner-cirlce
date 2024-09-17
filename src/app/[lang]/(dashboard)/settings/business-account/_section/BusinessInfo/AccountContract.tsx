import CustomTable from "@/components/CustomTable";
import { Icon } from "@/components/icons";
import { fDate } from "@/utils/format-time";
import { toNumber } from "@/utils/toNumber";
import { Button, Stack } from "@mui/material";
import type { FC } from "react";

interface AccountContractProps {}

const columns = [
  {
    title: "Contract Type",
    modify: (row: any) => row.type,
  },
  {
    title: "Date",
    modify: (row: any) => fDate(toNumber(row.created_at) * 1000, "dd.MM.yyyy"),
  },
  {
    title: "",
    modify: (row: any) => (
      <Stack gap={2}>
        <Button variant="text" href={row.preview} endIcon={<Icon name="Arrow-Right" />}>
          OPEN
        </Button>
      </Stack>
    ),
  },
];

const AccountContract: FC<AccountContractProps> = () => {
  return <CustomTable title="Contract" data={[]} columns={columns} />;
};

export default AccountContract;
