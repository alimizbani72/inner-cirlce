import type { Metadata } from "next";
import AffiliateSection from "./_sections";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAffiliateServiceAffiliateReferralCodeQuery } from "@/services/queries/prefetch";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate",
};

export default async function Affiliate() {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseAffiliateServiceAffiliateReferralCodeQuery(queryClient),
    // Add more prefetch queries here
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateSection />
    </HydrationBoundary>
  );
}
