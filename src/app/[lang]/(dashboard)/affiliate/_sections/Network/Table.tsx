"use client";

import { useMemo, type FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateChildrenQuery } from "@minecraft/queries";
import { formatCurrency } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";
import { toPascalCase } from "@/utils/change-case";
import Empty from "@/components/Empty";
import { useTranslate } from "@/locales";

const AffNetworkTabTable: FC = () => {
  const { t } = useTranslate();
  const { data } = useAffiliateServiceAffiliateChildrenQuery();
  const columns = useMemo(
    () => [
      {
        title: t("affNetworkTabTable.username"),
        modify: (row: any) => row.username,
      },
      {
        title: t("affNetworkTabTable.package"),
        modify: (row: any) => toPascalCase(row.plan_type),
      },
      {
        title: t("affNetworkTabTable.joinedDate"),
        modify: (row: any) => fDate(row.created_at, "dd.MM.yyyy"),
      },
      {
        title: t("affNetworkTabTable.moneyMade"),
        modify: (row: any) => formatCurrency(row.turnover),
      },
    ],
    [t]
  );

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
