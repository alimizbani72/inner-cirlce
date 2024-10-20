import type { Metadata } from "next";
import AffiliateMarketingRulesSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { prefetchUseGlobalAffilateRulesServiceGetGlobalsAffilateRules } from "@cms/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | Marketing rules",
};

export default async function AffiliateMarketingRules({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseGlobalAffilateRulesServiceGetGlobalsAffilateRules(queryClient, { locale: params.lang }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateMarketingRulesSection />
    </HydrationBoundary>
  );
}
