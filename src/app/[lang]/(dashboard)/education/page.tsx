import type { Metadata } from "next";
import EducationSection from "./_section";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { prefetchUseContentServiceContentVideoAcademyLangQuery } from "@/services/queries/prefetch";
import { getQueryClient } from "@app/_providers/customQueryClient";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Education",
};

export default async function EducationCategories({ params }: { params: { lang: string } }) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseContentServiceContentVideoAcademyLangQuery(queryClient, { lang: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EducationSection />;
    </HydrationBoundary>
  );
}
