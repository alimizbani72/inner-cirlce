'use client';

import { Scrollbar } from '@/components/scrollbar';
import { plans as plansConfig } from '@/configs/plans';
import { getUserPlanType } from '@/consts';
import { usePricingData } from '@/hooks/usePricingData';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { useGetMe } from '@/services/minecraft/auth/auth';
import { useGetFinancialPaymentsActive } from '@/services/minecraft/financial/financial';
import PricingTable from '@app-components/PricingTable';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import ActiveNotice from './ActiveNotice';
import ActivePlan from './ActivePlan';
import LoadingCard from './LoadingCard';
import PlanCard from './PlanCard';

const PricingSection = () => {
  const { t } = useTranslate();
  const [open, setOpen] = useState('');
  const { plans, rows, isLoading } = usePricingData();
  const { data: userData } = useGetMe();
  const userInfo = userData?.data;
  const { push } = useAppRouter();
  const { refetch, data, isSuccess } = useGetFinancialPaymentsActive({
    query: {
      enabled: false,
      retry: false,
    },
  });
  const handleOnContinue = () => {
    push(`/checkout/qr-wallet?plan_type=${data?.data?.plan_type}&id=${data?.data?.id}`);
  };

  const handleCheckActivePayment = async (plan_type: string) => {
    try {
      await refetch();
      if (isSuccess && data?.data?.id) {
        setOpen(plan_type);
      } else {
        push(`/checkout?plan_type=${plan_type}`);
      }
    } catch (error) {
      // TODO : check message and add || "some text"
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Stack
        sx={{
          '.os-scrollbar-handle': {
            cursor: 'pointer',
            backgroundColor: 'grey.dark',
            '&:hover': { backgroundColor: 'grey.dark' },
          },
        }}
      >
        <ActivePlan />

        <Stack py={{ md: 4, xs: 3 }} maxWidth="100%" overflow={'hidden'} gap={4}>
          <Scrollbar>
            <Stack
              direction={'row'}
              gap={2.5}
              px={{ md: 4, xs: 3 }}
              pb={3}
              minWidth={'max-content'}
            >
              {isLoading ? (
                <LoadingCard />
              ) : (
                plans?.map((plan) => (
                  <PlanCard
                    handlePayment={handleCheckActivePayment}
                    key={plan.id}
                    {...plan}
                    disabled={
                      plansConfig[getUserPlanType(userInfo) as keyof typeof plansConfig]?.order >=
                      plansConfig[plan.plan_type as keyof typeof plansConfig]?.order
                    }
                  />
                ))
              )}
            </Stack>
          </Scrollbar>

          {plans?.length && (
            <Stack gap={2}>
              <Typography px={{ md: 4, xs: 3 }} variant="h4-semi-bold">
                {t('plan.compares')}
              </Typography>

              <Stack
                pb={3}
                px={{ md: 4, xs: 0 }}
                maxWidth={{ md: 'calc(100vw - 64px)', xs: 'calc(100vw )' }}
              >
                <PricingTable
                  plansData={plans}
                  rows={rows}
                  userType={getUserPlanType(userInfo)}
                  buttonClick={handleCheckActivePayment}
                />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      {open && (
        <ActiveNotice
          open={open}
          onClose={() => setOpen('')}
          handlePay={(plan_type) => push(`/checkout?plan_type=${plan_type}`)}
          handleOnContinue={handleOnContinue}
        />
      )}
    </>
  );
};

export default PricingSection;
