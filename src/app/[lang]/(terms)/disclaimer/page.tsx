import type { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentCoinReportLangQuery } from "@minecraft/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";
import DisclaimerSection from "./_section";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default async function Disclaimer({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentCoinReportLangQuery(queryClient, { lang: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DisclaimerSection />
    </HydrationBoundary>
  );
}
