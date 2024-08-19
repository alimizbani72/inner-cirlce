import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import SliceWrapper from "./SliceWrapper";
import { prefetchUsePackagesServiceGetPackages } from "@cms/queries/prefetch";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Pricing", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function PricingLayout({ children }: LayoutProps) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUsePackagesServiceGetPackages(queryClient, { locale: "en" })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}
