import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import SliceWrapper from "./SliceWrapper";
import type { RouteParamsType } from "@/routes/type";
import { prefetchUsePackagesServiceGetPackages } from "@cms/queries/prefetch";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Pricing", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function PricingLayout({ children, params }: LayoutProps & RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUsePackagesServiceGetPackages(queryClient, { locale: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}
