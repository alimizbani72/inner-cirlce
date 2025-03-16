'use client';
import { Button, Stack, Typography } from '@mui/material';
import BillingInfo from './BillingInfo';
import BillingHistory from './BillingHistory';
import Icon from '@/components/icon';
import { useState } from 'react';
import BillingAddressDialog from './BillingAddressDialog';
import { useTranslate } from '@/locales';
import { useGetBillingAddress } from '@/services/minecraft/financial/financial';
import ContentStack from '@app-components/ContentStack';

const BillingSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useGetBillingAddress();
  const { t } = useTranslate();

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        p={{ md: 4, xs: 3 }}
        gap={{ md: 4, xs: 3 }}
      >
        <Stack
          width={1}
          gap={2}
          justifyContent="space-between"
          alignItems={{ md: 'center' }}
          direction={{ md: 'row' }}
        >
          <Typography variant="p1-medium" color="white">
            {t('billinghistory.billing')}
          </Typography>
          {isLoading ? (
            <ContentStack
              className="loading-skeleton"
              height={'50px'}
              sx={{ borderRadius: 4, width: { md: '180px', xs: 'unset' } }}
            />
          ) : (
            <Button
              size="large"
              color={data?.data?.address ? 'tertiary' : 'secondary'}
              startIcon={<Icon name="PenIcon" />}
              onClick={() => setOpenDialog(true)}
            >
              {data?.data?.address
                ? t('billinghistory.changeInfo')
                : t('billinghistory.setupbilling')}
            </Button>
          )}
        </Stack>

        <Stack width={1} gap={2}>
          <BillingInfo />
        </Stack>
      </Stack>
      <BillingHistory />

      {openDialog && (
        <BillingAddressDialog
          open={openDialog}
          close={() => setOpenDialog(false)}
          info={data?.data}
        />
      )}
    </>
  );
};

export default BillingSection;
