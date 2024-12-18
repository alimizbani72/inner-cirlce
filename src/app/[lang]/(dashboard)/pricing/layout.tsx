import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUsePackagesServiceGetPackages } from "@cms/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import SliceWrapper from "./SliceWrapper";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Pricing", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function PricingLayout({ children }: LayoutProps) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUsePackagesServiceGetPackages(queryClient, {
      locale: "en",
      where:
        process.env.NEXT_PUBLIC_ENV === "PRODUCTION"
          ? {
              status: {
                equals: "published",
              },
            }
          : undefined,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}
