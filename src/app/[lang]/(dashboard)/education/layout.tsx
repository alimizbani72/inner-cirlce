import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@app/_providers/customQueryClient";
import type { RouteParamsType } from "@/routes/type";
import SliceWrapper from "./SliceWrapper";
import { prefetchUseEducationVideosServiceGetEducationVideos } from "@cms/queries/prefetch";
import { UseAuthServiceMeQueryKeyFn } from "@minecraft/queries";
import { prefetchUseAuthServiceMeQuery } from "@minecraft/queries/prefetch";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Education", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function EducationLayout({ children, params }: LayoutProps & RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseAuthServiceMeQuery(queryClient),
    prefetchUseEducationVideosServiceGetEducationVideos(queryClient, { locale: params.lang, limit: 1000 }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SliceWrapper userMembership={(queryClient.getQueryData([UseAuthServiceMeQueryKeyFn]) as any)?.data?.plan_type} />
      {children}
    </HydrationBoundary>
  );
}

// export default async function EducationLayout() {
//   return <ComingSoon icon="Tutorial--colorful" />;
// }
