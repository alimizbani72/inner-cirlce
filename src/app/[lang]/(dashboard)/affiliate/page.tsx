import type { Metadata } from "next";
import AffiliateSection from "./_sections";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import {
  prefetchUseAffiliateServiceAffiliateChildrenQuery,
  prefetchUseAffiliateServiceAffiliateMeQuery,
  prefetchUseAffiliateServiceAffiliateProgressQuery,
  prefetchUseFinancialServiceFinancialInfoQuery,
  prefetchUseWalletServiceWalletDefaultQuery,
} from "@minecraft/queries/prefetch";
import { prefetchUseGlobalAffilateTermsServiceGetGlobalsAffilateTerms } from "@cms/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | Dashboard",
};

export default async function Affiliate({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseWalletServiceWalletDefaultQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateMeQuery(queryClient),
    prefetchUseFinancialServiceFinancialInfoQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateProgressQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateChildrenQuery(queryClient),
    prefetchUseGlobalAffilateTermsServiceGetGlobalsAffilateTerms(queryClient, {
      locale: params.lang,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateSection />
    </HydrationBoundary>
  );
}
