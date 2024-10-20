import type { Metadata } from "next";
import AffiliateHowItWorksSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAffiliateServiceAffiliateMeQuery } from "@minecraft/queries/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUseGlobalAffiliateHowItWorksServiceGetGlobalsAffiliateHowItWorks } from "@cms/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | How it works",
};

export default async function AffiliateHowItWorks({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseAffiliateServiceAffiliateMeQuery(queryClient),
    prefetchUseGlobalAffiliateHowItWorksServiceGetGlobalsAffiliateHowItWorks(queryClient, { locale: params.lang }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateHowItWorksSection />
    </HydrationBoundary>
  );
}
