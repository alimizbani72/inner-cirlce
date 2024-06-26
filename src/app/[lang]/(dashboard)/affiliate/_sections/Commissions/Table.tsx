"use client";

import { useMemo, type FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateCommissionListQuery } from "@minecraft/queries";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";
import Empty from "@/components/Empty";
import type { PayoutCommissionResponse } from "@minecraft/requests";
import { toTitleCase } from "@/utils/change-case";
import { useTranslate } from "@/locales";

const AffCommissionsTabTable: FC = () => {
  const { t } = useTranslate();
  const columns = useMemo(
    () => [
      {
        title: t("affCommissionsTabTable.userID"),
        modify: (row: PayoutCommissionResponse) => row.user_id,
      },
      {
        title: t("affCommissionsTabTable.amount"),
        modify: (row: PayoutCommissionResponse) => formatCurrency(row.amount),
      },
      {
        title: t("affCommissionsTabTable.packageName"),
        modify: (row: PayoutCommissionResponse) => toTitleCase(row.plan_type!),
      },
      {
        title: t("affCommissionsTabTable.percentage"),
        modify: (row: PayoutCommissionResponse) => toNumber(row.percent),
      },
      {
        title: t("affCommissionsTabTable.commissionDate"),
        modify: (row: PayoutCommissionResponse) => fDate(toNumber(row.created_at) * 1000, "dd.MM.yyyy"),
      },
    ],
    [t]
  );
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
            <CustomTable
              title={t("affCommissionsTabTable.commissionsTitle")}
              columns={columns}
              data={commissionList?.data || []}
            />
          </Stack>
        </Scrollbar>
      ) : (
        <Empty title={t("affCommissionsTabTable.noRecord")} />
      )}
    </Stack>
  );
};

export default AffCommissionsTabTable;
