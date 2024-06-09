import type { Metadata } from "next";
import PaymentResultSection from "./_sections";

export const metadata: Metadata = {
  title: "Payment Result | Chainmind",
};

export default async function PaymentResult() {
  return <PaymentResultSection />;
}
