"use client";

import type { FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateCommissionListQuery } from "@minecraft/queries";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";
import Empty from "@/components/Empty";
import type { PayoutCommissionResponse } from "@minecraft/requests";

const columns = [
  {
    title: "User ID",
    modify: (row: PayoutCommissionResponse) => row.user_id,
  },
  {
    title: "Amount",
    modify: (row: PayoutCommissionResponse) => formatCurrency(row.amount),
  },
  {
    title: "Commission Date",
    modify: (row: PayoutCommissionResponse) => fDate(toNumber(row.created_at) * 1000, "dd.MM.yyyy"),
  },
];

const AffCommissionsTabTable: FC = () => {
  const { data: commissionList } = useAffiliateServiceAffiliateCommissionListQuery();
  return (
    <Stack>
      {commissionList?.data?.length ? (
        <Scrollbar>
          <Stack
            alignItems="flex-start"
            maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}
            sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
          >
            <CustomTable title="Commissions" columns={columns} data={commissionList?.data || []} />
          </Stack>
        </Scrollbar>
      ) : (
        <Empty title="You have not any commission record yet" />
      )}
    </Stack>
  );
};

export default AffCommissionsTabTable;
