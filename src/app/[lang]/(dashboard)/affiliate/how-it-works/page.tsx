import type { Metadata } from "next";
import AffiliateHowItWorksSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAffiliateServiceAffiliateMeQuery } from "@minecraft/queries/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | How it works",
};

export default async function AffiliateHowItWorks() {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseAffiliateServiceAffiliateMeQuery(queryClient)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateHowItWorksSection />
    </HydrationBoundary>
  );
}
