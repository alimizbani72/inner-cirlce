import type { Metadata } from "next";
import PricingSection from "./_sections";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Pricing",
};

export default async function PricingPage() {
  return <PricingSection />;
}
