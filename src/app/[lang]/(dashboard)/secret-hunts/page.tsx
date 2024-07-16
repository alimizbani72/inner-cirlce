import type { Metadata } from "next";
import SecretHuntsSection from "./_section/indesx";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Secret Hunts",
};

export default async function SecretHunts() {
  return <SecretHuntsSection />;
}
