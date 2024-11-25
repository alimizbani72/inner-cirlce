import { Stack } from "@mui/material";
import type { Metadata } from "next";
import Notice from "./_sections/Notice";
import Table from "./_sections/table";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentCoinReportLangQuery } from "@minecraft/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";
import LearningBanner from "./_sections/LearningBanner";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReports({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseContentServiceContentCoinReportLangQuery(queryClient, {
      lang: params.lang,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={3} py={{ md: 4, xs: 3 }}>
        <LearningBanner />

        <Notice />

        <Table />
      </Stack>
    </HydrationBoundary>
  );
}
