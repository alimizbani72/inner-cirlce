import type { Metadata } from "next";
import CheckoutSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import {
  prefetchUseFinancialServiceBillingAddressQuery,
  prefetchUseFinancialServiceFinancialCalculatePriceQuery,
} from "@minecraft/queries/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
type Props = {
  searchParams: { id: string; plan_type: string; symbol: string };
};

export const metadata: Metadata = {
  title: "Checkout | ChainMind",
};

export default async function Checkout({ searchParams: { plan_type, symbol } }: Props) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseFinancialServiceBillingAddressQuery(queryClient),
    prefetchUseFinancialServiceFinancialCalculatePriceQuery(queryClient, {
      planType: plan_type,
      symbol: symbol || "USDC",
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckoutSection planType={plan_type} />
    </HydrationBoundary>
  );
}
