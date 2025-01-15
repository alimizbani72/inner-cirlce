import type { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/configs/authOptions";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAffiliateServiceAffiliateReferralCodeQuery } from "@minecraft/queries/prefetch";
import Template from "@dashboard/affiliate/_sections/AffTemplate";
import { Stack } from "@mui/material";
import LearningBanner from "@dashboard/coin-reports/_sections/LearningBanner";
import AffiliateHeader from "./_sections/Header";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// ----------------------------------------------------------------------

export default async function AffiliateLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions(""));

  if (!session?.user?.kyc_status) {
    return notFound();
  }

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
        {children}
      </Stack>
    </HydrationBoundary>
  );
}
