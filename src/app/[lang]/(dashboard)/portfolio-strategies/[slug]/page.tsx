import type { Metadata } from "next";
import PortfolioStrategiesInnerSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentPortfolioStrategyPlanQuery } from "@/services/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `${params.slug.toLocaleUpperCase()} Strategy` };
}

export default async function PortfolioStrategiesInner({ params }: Props) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentPortfolioStrategyPlanQuery(queryClient, { plan: params.slug })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioStrategiesInnerSection pageTitle={`${params.slug.toLocaleUpperCase()} Strategy`} plan={params.slug} />
    </HydrationBoundary>
  );
}
