import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import BillingSection from "./_section";
import { getQueryClient } from "@app/_providers/customQueryClient";
import {
  prefetchUseFinancialServiceBillingAddressQuery,
  prefetchUseFinancialServiceFinancialPaymentsQuery,
} from "@minecraft/queries/prefetch";

export default async function BillingPage() {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseFinancialServiceFinancialPaymentsQuery(queryClient, {
      opts: JSON.stringify({
        sorts: { created_at: false },
        page: 1,
        per_page: 200,
        filters: { status: ["completed", "manually-completed"] },
      }),
    }),
    prefetchUseFinancialServiceBillingAddressQuery(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BillingSection />
    </HydrationBoundary>
  );
}
