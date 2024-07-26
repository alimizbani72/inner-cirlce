import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import type { RouteParamsType } from "@/routes/type";
import SliceWrapper from "./SliceWrapper";
import { prefetchUseEducationVideosServiceGetEducationVideos } from "@cms/queries/prefetch";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Education", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function EducationLayout({ children, params }: LayoutProps & RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseEducationVideosServiceGetEducationVideos(queryClient, { locale: params.lang })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper />
      {children}
    </HydrationBoundary>
  );
}

// export default async function EducationLayout() {
//   return <ComingSoon icon="Tutorial--colorful" />;
// }
