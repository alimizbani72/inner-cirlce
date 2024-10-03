"use client";

import { type ChangeEvent, useMemo, useState, type FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateCommissionListQuery } from "@minecraft/queries";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";
import type { PayoutCommissionResponse, SampleListOpts } from "@minecraft/requests";
import { toTitleCase } from "@/utils/change-case";
import { useTranslate } from "@/locales";

const AffCommissionsTabTable: FC = () => {
  const { t } = useTranslate();
  const [filterOpts, setFilterOpts] = useState({
    sorts: { created_at: false },
    page: 1,
    per_page: 10,
  });
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
  const { data: commissionList, isLoading } = useAffiliateServiceAffiliateCommissionListQuery({
    opts: JSON.stringify(filterOpts) as SampleListOpts,
  });

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setFilterOpts((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <Stack>
      <Scrollbar>
        <Stack
          alignItems="flex-start"
          maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}
          sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable
            page={filterOpts.page}
            isPending={isLoading}
            handleChangePage={handleChangePage}
            totalCount={commissionList?.meta?.total_count}
            title={t("affCommissionsTabTable.commissionsTitle")}
            columns={columns}
            data={commissionList?.data || []}
            emptyTitle={t("affCommissionsTabTable.noRecord")}
          />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffCommissionsTabTable;
