import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentVideoAcademyLangQuery } from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import SliceWrapper from "./SliceWrapper";
import type { RouteParamsType } from "@/routes/type";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Education", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function EducationLayout({ children, params }: LayoutProps & RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentVideoAcademyLangQuery(queryClient, { lang: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}
