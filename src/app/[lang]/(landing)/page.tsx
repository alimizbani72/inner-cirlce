import { getQueryClient } from "@app/_providers/customQueryClient";
import HomePageSection from "../_sections/Landing";
import { prefetchUsePagesServiceGetPages } from "@cms/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { RouteParamsType } from "@/routes/type";

// ----------------------------------------------------------------------

export const metadata = {
  title: "ChainMind - Unlock The Secret With Expert Crypto Guidance!",
};

export default async function HomePage({ params }: RouteParamsType) {
  const queryClient = getQueryClient();

  await Promise.all([prefetchUsePagesServiceGetPages(queryClient, { locale: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageSection />
    </HydrationBoundary>
  );
}
