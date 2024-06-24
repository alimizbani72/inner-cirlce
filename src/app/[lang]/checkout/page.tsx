import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout | ChainMind",
};

export default async function Checkout() {
  notFound();
  // return <CheckoutSection />;
}
