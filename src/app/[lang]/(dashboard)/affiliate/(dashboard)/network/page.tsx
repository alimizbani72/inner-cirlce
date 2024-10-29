import { getQueryClient } from "@app/_providers/customQueryClient";
import AffNetworkTab from "@dashboard/affiliate/_sections/Network";
import { prefetchUseAffiliateServiceAffiliateChildrenQuery } from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | Network",
};

export default async function NetworkPage() {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseAffiliateServiceAffiliateChildrenQuery(queryClient)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffNetworkTab />
    </HydrationBoundary>
  );
}
