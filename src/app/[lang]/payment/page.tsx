import type { Metadata } from "next";
import PaymentResultSection from "./_sections";

export const metadata: Metadata = {
  title: "Payment Result | ChainMind",
};

export default async function PaymentResult() {
  return <PaymentResultSection />;
}
