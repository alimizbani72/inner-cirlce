import type { Metadata } from "next";
import AffiliateMarketingAssetsSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAffiliateServiceAffiliateMarketingAssetsQuery } from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | Marketing assets",
};

export default async function AffiliateMarketingAssets() {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseAffiliateServiceAffiliateMarketingAssetsQuery(queryClient)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateMarketingAssetsSection />;
    </HydrationBoundary>
  );
}
