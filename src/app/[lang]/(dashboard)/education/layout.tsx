import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseContentServiceContentVideoAcademyLangQuery } from "@/services/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import SliceWrapper from "./SliceWrapper";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Education", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
  params: { lang: string };
};

export default async function EducationLayout({ children, params }: LayoutProps) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentVideoAcademyLangQuery(queryClient, { lang: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}
