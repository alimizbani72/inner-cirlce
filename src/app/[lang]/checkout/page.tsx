import type { Metadata } from "next";
import CheckoutSection from "./_sections";
type Props = {
  searchParams: { id: string; plan_type: string };
};

export const metadata: Metadata = {
  title: "Checkout | ChainMind",
};

export default async function Checkout({ searchParams: { id, plan_type } }: Props) {
  return <CheckoutSection planType={plan_type} id={id} />;
}
