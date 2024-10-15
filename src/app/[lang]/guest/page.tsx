import type { Metadata } from "next";
import GuestSection from "./_section";

export const metadata: Metadata = {
  title: "Guest User | ChainMind",
};

export default async function GuestPage() {
  return <GuestSection />;
}
