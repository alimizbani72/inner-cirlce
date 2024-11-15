import type { RouteParamsType } from "@/routes/type";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner } from "@cms/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import BecomePartnerSection from "./_section";

export default async function BecomePartnerPage({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner(queryClient, { locale: params.lang }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BecomePartnerSection />
    </HydrationBoundary>
  );
}
