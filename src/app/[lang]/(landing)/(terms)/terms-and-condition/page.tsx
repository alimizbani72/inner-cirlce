import type { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentCoinReportLangQuery } from "@minecraft/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";
import TermsSection from "./_section";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Terms & Condition",
};

export default async function Terms({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentCoinReportLangQuery(queryClient, { lang: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TermsSection />
    </HydrationBoundary>
  );
}
