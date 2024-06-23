import type { PropsWithChildren } from "react";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAccountServiceAuthUserinfoQuery } from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// ----------------------------------------------------------------------

export default async function AffiliateLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseAccountServiceAuthUserinfoQuery(queryClient)]);

  // if (!(queryClient.getQueryData([useAccountServiceAuthUserinfoQueryKey]) as any)?.data?.kyc_status) {
  //   return notFound();
  // }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
