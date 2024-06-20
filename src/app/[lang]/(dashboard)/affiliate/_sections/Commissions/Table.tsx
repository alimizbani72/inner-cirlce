"use client";

import type { FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateCommissionsQuery } from "@/services/queries";
import type { PayoutCommissionResponse } from "@/services/requests";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";

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
  const { data: commissionList } = useAffiliateServiceAffiliateCommissionsQuery();
  return (
    <Stack>
      <Scrollbar>
        <Stack
          alignItems="flex-start"
          maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}
          sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable title="Commissions" columns={columns} data={commissionList?.data?.commissions || []} />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffCommissionsTabTable;
