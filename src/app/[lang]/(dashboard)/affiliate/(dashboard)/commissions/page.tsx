import { getQueryClient } from "@app/_providers/customQueryClient";
import AffCommissionsTab from "@dashboard/affiliate/_sections/Commissions";
import {
  prefetchUseAffiliateServiceAffiliateCommissionListQuery,
  prefetchUseFinancialServiceFinancialInfoQuery,
  prefetchUseWalletServiceWalletDefaultQuery,
} from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | Commissions",
};

export default async function CommissionsPage() {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseWalletServiceWalletDefaultQuery(queryClient),
    prefetchUseFinancialServiceFinancialInfoQuery(queryClient),
    prefetchUseAffiliateServiceAffiliateCommissionListQuery(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffCommissionsTab />
    </HydrationBoundary>
  );
}
