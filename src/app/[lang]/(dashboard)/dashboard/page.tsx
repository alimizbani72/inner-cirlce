import type { Metadata } from "next";
import { getQueryClient } from "@app/_providers/customQueryClient";
import {
  prefetchUseGlobalDropZoneServiceGetGlobalsDropZone,
  prefetchUseGlobalLiveFeedServiceGetGlobalsLiveFeed,
  prefetchUseGlobalSocialMediaServiceGetGlobalsSocialMedia,
  prefetchUseRoadmapsServiceGetRoadmaps,
} from "@cms/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { RouteParamsType } from "@/routes/type";
import { prefetchUseFinancialServiceFinancialPaymentsActiveQuery } from "@minecraft/queries/prefetch";
import DashboardSection from "./_section/indesx";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseRoadmapsServiceGetRoadmaps(queryClient, { locale: params.lang }),
    prefetchUseGlobalLiveFeedServiceGetGlobalsLiveFeed(queryClient, { locale: params.lang }),
    prefetchUseGlobalSocialMediaServiceGetGlobalsSocialMedia(queryClient, { locale: params.lang }),
    prefetchUseGlobalDropZoneServiceGetGlobalsDropZone(queryClient, { locale: params.lang }),
    prefetchUseFinancialServiceFinancialPaymentsActiveQuery(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardSection />
    </HydrationBoundary>
  );
}
