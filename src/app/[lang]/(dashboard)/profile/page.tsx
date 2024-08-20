import { getQueryClient } from "@app/_providers/customQueryClient";
import ProfileDialog from "./_section";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner } from "@cms/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";

export default async function ProfilePage({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner(queryClient, { locale: params.lang }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileDialog />
    </HydrationBoundary>
  );
}
