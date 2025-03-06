'use client';

import { useMemo, type FC } from 'react';
import { Stack } from '@mui/material';
import CustomTable from '@/components/CustomTable';
import { formatCurrency } from '@/utils/toNumber';
import { fDate } from '@/utils/format-time';
import { toPascalCase } from '@/utils/change-case';
import Empty from '@/components/Empty';
import { useTranslate } from '@/locales';
import { Scrollbar } from '@/components/scrollbar';
import { useGetAffiliateChildren } from '@/services/minecraft/affiliate/affiliate';
import Loading from '@/components/Loading';

const AffNetworkTabTable: FC = () => {
  const { t } = useTranslate();
  const { data, isLoading } = useGetAffiliateChildren();
  const columns = useMemo(
    () => [
      {
        title: t('affNetworkTabTable.username'),
        modify: (row: any) => row.username,
      },
      {
        title: t('affNetworkTabTable.package'),
        modify: (row: any) => toPascalCase(row.plan_type),
      },
      {
        title: t('affNetworkTabTable.joinedDate'),
        modify: (row: any) => fDate(row.created_at, 'DD.MM.YYYY'),
      },
      {
        title: t('affNetworkTabTable.moneyMade'),
        modify: (row: any) => formatCurrency(row.turnover),
      },
    ],
    [t]
  );
  if (isLoading) {
    return (
      <Stack maxWidth={{ md: 'calc(100vw - 64px)', xs: 'calc(100vw - 48px)' }}>
        <Loading />
      </Stack>
    );
  }
  return (
    <Stack px={{ md: 4, xs: 0 }} pt={3}>
      {data?.data?.nested_users?.length ? (
        <Scrollbar>
          <Stack alignItems="flex-start" maxWidth={{ md: 'calc(100vw - 64px)', xs: '100vw' }}>
            <CustomTable
              columns={columns}
              data={(data?.data?.nested_users?.[0] as any)?.children}
            />
          </Stack>
        </Scrollbar>
      ) : (
        <Empty />
      )}
    </Stack>
  );
};

export default AffNetworkTabTable;
