import { getQueryClient } from "@app/_providers/customQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner } from "@cms/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";
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
