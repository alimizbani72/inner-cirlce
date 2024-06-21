import type { Metadata } from "next";
import EducationSection from "./_section";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { prefetchUseContentServiceContentVideoAcademyLangQuery } from "@minecraft/queries/prefetch";
import { getQueryClient } from "@app/_providers/customQueryClient";
import type { RouteParamsType } from "@/routes/type";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Education",
};

export default async function EducationCategories({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentVideoAcademyLangQuery(queryClient, { lang: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EducationSection />;
    </HydrationBoundary>
  );
}
