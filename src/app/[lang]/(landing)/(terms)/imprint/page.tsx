import type { Metadata } from "next";
import ImprintSection from "./_section";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Imprint",
};

export default async function Imprint() {
  return <ImprintSection />;
}
