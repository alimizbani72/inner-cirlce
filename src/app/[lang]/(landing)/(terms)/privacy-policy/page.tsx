import type { Metadata } from "next";
import PrivacySection from "./_section";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default async function Privacy() {
  return <PrivacySection />;
}
