"use client";
import { useFinancialServiceFinancialPaymentsActiveQuery } from "@minecraft/queries";
import StaticAlert from "@app/_components/StaticAlert";
import { toTitleCase } from "@/utils/change-case";
import { useAppRouter } from "@/routes/hooks";
import { useTranslate } from "@/locales";

const PaymentNotice = () => {
  const { push } = useAppRouter();
  const { data, isSuccess } = useFinancialServiceFinancialPaymentsActiveQuery(undefined, {
    retry: false,
    refetchInterval: (response) => {
      // retry 10 minutes later to get the fresh data
      if (response?.state?.data?.data?.status === "created") {
        return 10 * 60 * 1000;
      }

      return false;
    },
  });
  const { t } = useTranslate();

  const handleOnContinue = () => {
    push(`/checkout?plan_type=${data?.data?.plan_type}&id=${data?.data?.id}`);
  };

  return (
    <>
      {isSuccess && data?.data?.id && (
        <StaticAlert
          title={t("dashboardSection.incompletePaymentAlert")}
          description={t("dashboardSection.incompletePaymentDescription", {
            planType: toTitleCase(data?.data?.plan_type!),
          })}
          onContinue={handleOnContinue}
        />
      )}
    </>
  );
};

export default PaymentNotice;
