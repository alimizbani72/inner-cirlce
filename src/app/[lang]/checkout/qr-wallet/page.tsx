import type { Metadata } from "next";
import CheckoutQRWalletSection from "./_sections";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { prefetchUseFinancialServiceFinancialPaymentsIdStatusQuery } from "@minecraft/queries/prefetch";

type Props = {
  searchParams: { id: string; plan_type: string };
};

export const metadata: Metadata = {
  title: "Checkout: Pay with QR Code or Wallet Address | ChainMind",
};

export default async function CheckoutQRWallet({ searchParams: { id, plan_type } }: Props) {
  const queryClient = getQueryClient();
  await Promise.all([prefetchUseFinancialServiceFinancialPaymentsIdStatusQuery(queryClient, { id })]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckoutQRWalletSection planType={plan_type} id={id} />
    </HydrationBoundary>
  );
}
