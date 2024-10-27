import CustomTable from "@/components/CustomTable";
import { Stack } from "@mui/material";
import { useMemo, type FC } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { fDate } from "@/utils/format-time";
import ViewContractButton from "./ViewContractButton";
import { useTranslate } from "@/locales";

interface AccountContractProps {}

const AccountContract: FC<AccountContractProps> = () => {
  const userInfo = useAppSelector(selectUser);
  const { t } = useTranslate();

  const columns = useMemo(
    () => [
      {
        title: t("businessaccount.contractType"),
        modify: (row: any) => row.name,
      },
      {
        title: t("businessaccount.date"),
        modify: (row: any) => fDate(row?.business_Info?.created_at, "dd.MM.yyyy - HH:mm"),
      },
      {
        title: "",
        modify: (row: any) => (
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ViewContractButton info={row?.business_Info} />
          </Stack>
        ),
      },
    ],
    [t]
  );

  return (
    <CustomTable
      title={t("businessaccount.contract")}
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
