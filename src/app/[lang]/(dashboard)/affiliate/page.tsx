import type { Metadata } from "next";
import AffiliateSection from "./_sections";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate",
};

export default async function Affiliate() {
  return <AffiliateSection />;
}
