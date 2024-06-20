"use client";

import type { FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateChildrenQuery } from "@/services/queries";
import { formatCurrency } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";
import { toPascalCase } from "@/utils/change-case";
import Empty from "@/components/Empty";

const columns = [
  {
    title: "Username",
    modify: (row: any) => row.username,
  },
  {
    title: "Package",
    modify: (row: any) => toPascalCase(row.plan_type),
  },
  {
    title: "Joined Date",
    modify: (row: any) => fDate(row.created_at, "dd.MM.yyyy"),
  },
  {
    title: "Money made?",
    modify: (row: any) => formatCurrency(row.turnover),
  },
];

const AffNetworkTabTable: FC = () => {
  const { data } = useAffiliateServiceAffiliateChildrenQuery();

  return (
    <Stack>
      {data?.data?.nested_users?.length ? (
        <Scrollbar>
          <Stack
            alignItems="flex-start"
            maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}
            sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
          >
            <CustomTable columns={columns} data={data?.data?.nested_users!} />
          </Stack>
        </Scrollbar>
      ) : (
        <Empty />
      )}
    </Stack>
  );
};

export default AffNetworkTabTable;
