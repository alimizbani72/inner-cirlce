'use client';
import { toTitleCase } from '@/utils/change-case';
import { useAppRouter } from '@/routes/hooks';
import { useTranslate } from '@/locales';
import { useGetFinancialPaymentsActive } from '@/services/minecraft/financial/financial';
import StaticAlert from '@app-components/StaticAlert';

const PaymentNotice = () => {
  const { push } = useAppRouter();
  const { data, isSuccess } = useGetFinancialPaymentsActive({
    query: {
      retry: false,
      refetchInterval: (response) => {
        // retry 10 minutes later to get the fresh data
        if (response?.state?.data?.data?.status === 'created') {
          return 10 * 60 * 1000;
        }

        return false;
      },
    },
  });
  const { t } = useTranslate();

  const handleOnContinue = () => {
    push(`/checkout/qr-wallet?plan_type=${data?.data?.plan_type}&id=${data?.data?.id}`);
  };

  return (
    <>
      {isSuccess && data?.data?.id && (
        <StaticAlert
          title={t('dashboardSection.incompletePaymentAlert')}
          description={t('dashboardSection.incompletePaymentDescription', {
            planType: toTitleCase(data?.data?.plan_type!),
          })}
          onContinue={handleOnContinue}
        />
      )}
    </>
  );
};

export default PaymentNotice;
