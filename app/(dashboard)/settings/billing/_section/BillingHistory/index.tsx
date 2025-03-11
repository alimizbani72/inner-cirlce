'use client';

import CustomTable from '@/components/CustomTable';
import { fDate } from '@/utils/format-time';
import type { FC } from 'react';
import ActionButtons from './ActionButtons';
import { useTranslate } from '@/locales';
import { useGetFinancialPayments } from '@/services/minecraft/financial/financial';
import type { PaymentHttpPaymentItemResponse } from '@/services/minecraft/minecraftAPI.schemas';
import { Stack } from '@mui/material';

const columns = [
  {
    title: 'Invoice number',
    modify: (row: PaymentHttpPaymentItemResponse) => row.id,
  },
  {
    title: 'Invoice Date',
    modify: (row: PaymentHttpPaymentItemResponse) => fDate(row.created_at, 'DD.MM.YYYY HH:mm'),
  },
  {
    title: '',
    modify: (row: PaymentHttpPaymentItemResponse) => <ActionButtons row={row} />,
  },
];

const BillingHistory: FC = () => {
  const { t } = useTranslate();
  const { data, isLoading } = useGetFinancialPayments({
    opts: JSON.stringify({
      sorts: { created_at: false },
      page: 1,
      per_page: 200,
      filters: { status: ['completed', 'manually-completed'] },
    }),
  });

  return (
    <Stack px={{ md: 4, xs: 0 }} pb={3}>
      <Stack alignItems="flex-start" maxWidth="100%">
        <CustomTable
          title={t('billinghistory.history')}
          data={data?.data ?? []}
          columns={columns}
          isPending={isLoading}
          emptyTitle={t('billinghistory.emptyTitle')}
          emptySubtitle={t('billinghistory.emptySubtitle')}
        />
      </Stack>
    </Stack>
  );
};

export default BillingHistory;
