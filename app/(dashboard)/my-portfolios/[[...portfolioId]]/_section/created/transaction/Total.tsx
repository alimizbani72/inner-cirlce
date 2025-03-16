'use client';
import { Stack, Typography } from '@mui/material';
import numeral from 'numeral';
import { useMemo } from 'react';
import { useTranslate } from '@/locales';

type TransactionTotalProps = {
  btnValue: number;
  price: number;
  quantity: number;
  fee: number;
};

const Total = ({ btnValue, price, quantity, fee }: TransactionTotalProps) => {
  const { t } = useTranslate();

  const total = useMemo(() => {
    return btnValue === 1 ? price * quantity + fee : price * quantity - fee;
  }, [btnValue, price, quantity, fee]);

  return (
    <Stack>
      <Typography variant="p1-medium">${numeral(total).format('0,0.00')}</Typography>
      <Typography variant="caption-medium" color={'grey.light'}>
        {btnValue === 1
          ? t('portfolioTransaction.totalSpent')
          : t('portfolioTransaction.totalReceived')}
      </Typography>
    </Stack>
  );
};

export default Total;
