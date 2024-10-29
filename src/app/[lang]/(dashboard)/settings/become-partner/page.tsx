import { getQueryClient } from "@app/_providers/customQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner } from "@cms/queries/prefetch";
import type { RouteParamsType } from "@/routes/type";
import BecomePartnerSection from "./_section";
import { getServerSession } from "next-auth";
import { authOptions } from "@/configs/authOptions";
import { notFound } from "next/navigation";

export default async function BecomePartnerPage({ params }: RouteParamsType) {
  const session = await getServerSession(authOptions(""));

  if (session?.user?.kyc_status) {
    return notFound();
  }

  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseGlobalBecomeApartnerServiceGetGlobalsBecomeApartner(queryClient, { locale: params.lang }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BecomePartnerSection />
    </HydrationBoundary>
  );
}
