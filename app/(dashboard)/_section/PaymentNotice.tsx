"use client";

import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { toTitleCase } from "@/utils/change-case";
import StaticAlert from "@app-components/StaticAlert";
import { useState } from "react";

const PaymentNotice = () => {
  const { push } = useAppRouter();
  const { t } = useTranslate();

  // 🔹 Dummy API response
  const [data] = useState({
    data: {
      id: "12345",
      plan_type: "premium",
      status: "created", // change to test behavior
    },
  });

  const isSuccess = false;

  const handleOnContinue = () => {
    push(
      `/checkout/qr-wallet?plan_type=${data?.data?.plan_type}&id=${data?.data?.id}`,
    );
  };

  return (
    <>
      {isSuccess && data?.data?.id && data?.data?.status === "created" && (
        <StaticAlert
          title={t("dashboardSection.incompletePaymentAlert")}
          description={t("dashboardSection.incompletePaymentDescription", {
            planType: toTitleCase(data.data.plan_type),
          })}
          onContinue={handleOnContinue}
        />
      )}
    </>
  );
};

export default PaymentNotice;
