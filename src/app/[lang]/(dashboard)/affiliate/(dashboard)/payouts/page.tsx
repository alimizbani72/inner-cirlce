import { getQueryClient } from "@app/_providers/customQueryClient";
import AffPayoutsTab from "@dashboard/affiliate/_sections/Payouts";
import { prefetchUseFinancialServiceFinancialPayoutsQuery } from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate | Payouts",
};

export default async function PayoutsPage() {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseFinancialServiceFinancialPayoutsQuery(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffPayoutsTab />
    </HydrationBoundary>
  );
}
