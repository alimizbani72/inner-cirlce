import type { Metadata } from "next";
import AffiliateSection from "./_sections";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import {
  prefetchUseAffiliateServiceAffiliateBalanceQuery,
  prefetchUseAffiliateServiceAffiliateChildrenQuery,
  prefetchUseAffiliateServiceAffiliateCommissionListQuery,
  prefetchUseAffiliateServiceAffiliateMeQuery,
  prefetchUseAffiliateServiceAffiliateProgressQuery,
  prefetchUseAffiliateServiceAffiliateReferralCodeQuery,
  prefetchUseFinancialServiceFinancialInfoQuery,
  prefetchUseFinancialServiceFinancialPayoutsQuery,
  prefetchUseWalletServiceWalletDefaultQuery,
} from "@minecraft/queries/prefetch";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate",
};

export default async function Affiliate() {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseWalletServiceWalletDefaultQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateMeQuery(queryClient),
    prefetchUseFinancialServiceFinancialInfoQuery(queryClient),
    prefetchUseFinancialServiceFinancialPayoutsQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateBalanceQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateProgressQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateChildrenQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateCommissionListQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateReferralCodeQuery(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateSection />
    </HydrationBoundary>
  );
}
