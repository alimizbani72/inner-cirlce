import { getQueryClient } from "@app/_providers/customQueryClient";
import Template from "@dashboard/affiliate/_sections/AffTemplate";
import LearningBanner from "@dashboard/coin-reports/_sections/LearningBanner";
import { prefetchUseAffiliateServiceAffiliateReferralCodeQuery } from "@minecraft/queries/prefetch";
import { Stack } from "@mui/material";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import AffiliateHeader from "./_sections/Header";
import KYCWrapper from "./_sections/KYCWrapper";
// ----------------------------------------------------------------------

export default async function AffiliateLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseAffiliateServiceAffiliateReferralCodeQuery(queryClient)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack flex={1} py={{ md: 4, xs: 3 }} width={{ xs: "calc(100vw - 16px)", md: "unset" }}>
        {/* Header */}
        <Stack gap={4}>
          <LearningBanner />
          <AffiliateHeader />
        </Stack>
        {/* Tabs */}
        <Template />
        <KYCWrapper>{children}</KYCWrapper>
      </Stack>
    </HydrationBoundary>
  );
}
