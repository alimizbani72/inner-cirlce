"use client";

import { Box, Stack } from "@mui/material";
import WelcomeBanner from "./WelcomeBanner";
import LiveFeed from "./LiveFeed";
import RoadMap from "./RoadMap";
import SocialMedia from "./SocialMedia";
import DropZone from "./DropZone";
import { useFinancialServiceFinancialPaymentsActiveQuery } from "@minecraft/queries";
import StaticAlert from "@app/_components/StaticAlert";
import { toTitleCase } from "@/utils/change-case";
import { useAppRouter } from "@/routes/hooks";
import { useTranslate } from "@/locales";

// ----------------------------------------------------------------------

const DashboardSection = () => {
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
    push(`/checkout/qr-wallet?plan_type=${data?.data?.plan_type}&id=${data?.data?.id}`);
  };

  return (
    <Box sx={{ flex: 1 }}>
      {isSuccess && data?.data?.id && (
        <StaticAlert
          title={t("dashboardSection.incompletePaymentAlert")}
          description={t("dashboardSection.incompletePaymentDescription", {
            planType: toTitleCase(data?.data?.plan_type!),
          })}
          onContinue={handleOnContinue}
        />
      )}

      <WelcomeBanner />

      <Stack p={{ md: 4, xs: 3 }} gap={3}>
        <Stack gap={3} direction={{ md: "row", xs: "column" }}>
          <Stack flex={1} width={{ md: "calc(50% - 32px)", xs: "calc(100vw - 48px)" }}>
            <DropZone />
          </Stack>

          <Stack flex={1}>
            <LiveFeed />
          </Stack>
        </Stack>

        <RoadMap />

        <SocialMedia />
      </Stack>
    </Box>
  );
};

export default DashboardSection;
