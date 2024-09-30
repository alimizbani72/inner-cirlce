import CustomTable from "@/components/CustomTable";
import { Icon } from "@/components/icons";
import { Button, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import type { FC } from "react";
import ContractDocument from "./ContractDocument";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { fDate } from "@/utils/format-time";

const BlobProvider = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.BlobProvider), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface AccountContractProps {}

const columns = [
  {
    title: "Contract Type",
    modify: (row: any) => row.name,
  },
  {
    title: "Date",
    modify: (row: any) => fDate(row?.business_Info?.created_at, "dd.MM.yyyy - HH:mm"),
  },
  {
    title: "",
    modify: (row: any) => (
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <BlobProvider document={<ContractDocument info={row?.business_Info} />}>
          {/* @ts-ignore */}
          {({ loading, url }) =>
            loading ? (
              "Loading preview..."
            ) : (
              <Button
                variant="text"
                endIcon={<Icon name="Arrow-right" />}
                target="_blank"
                href={url!}
                rel="noopener noreferrer"
              >
                <Stack sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: "white", mr: 1.5 }} />
                OPEN
              </Button>
            )
          }
        </BlobProvider>
      </Stack>
    ),
  },
];

const AccountContract: FC<AccountContractProps> = () => {
  const userInfo = useAppSelector(selectUser);

  return (
    <CustomTable
      title="Contract"
      data={[
        {
          id: "Contract between “ChainMind & You”",
          name: "Contract between “ChainMind & You”",
          business_Info: userInfo?.business_info,
        },
      ]}
      columns={columns}
    />
  );
};

export default AccountContract;
