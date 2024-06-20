import { Stack } from "@mui/material";
import type { Metadata } from "next";
import Notice from "./_sections/Notice";
import Table from "./_sections/Table";
import LearningBanner from "./_sections/LearningBanner";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentCoinReportLangQuery } from "@/services/queries/prefetch";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReports() {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentCoinReportLangQuery(queryClient, { lang: "en" })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={3}>
        <LearningBanner />

        <Notice />

        <Table />
      </Stack>
    </HydrationBoundary>
  );
}
