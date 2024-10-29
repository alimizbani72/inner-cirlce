import { getQueryClient } from "@app/_providers/customQueryClient";
import { UsePortfolioServicePortfoliosQueryKeyFn } from "@minecraft/queries";
import { prefetchUsePortfolioServicePortfoliosQuery } from "@minecraft/queries/prefetch";
import { Stack } from "@mui/material";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type React from "react";

type PortfolioLayoutProps = {
  children: React.ReactNode;
  history: React.ReactNode;
  assets: React.ReactNode;
  allocation: React.ReactNode;
};

export default async function PortfolioLayout({ children, history, allocation, assets }: PortfolioLayoutProps) {
  const queryClient = getQueryClient();
  await prefetchUsePortfolioServicePortfoliosQuery(queryClient);

  // Fetch portfolio data <AddPortfolioSection />
  const portfolios = queryClient.getQueryData(UsePortfolioServicePortfoliosQueryKeyFn());
  const hasPortfolios = portfolios && (portfolios as any)?.data?.length > 0;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack height={"100%"}>
        {children}
        {hasPortfolios ? (
          <>
            <Stack direction={{ xs: "column", md: "row" }} px={{ xs: 3, md: 4 }} pb={3} spacing={3}>
              {history}
              {allocation}
            </Stack>
            {assets}
          </>
        ) : null}
      </Stack>
    </HydrationBoundary>
  );
}
