import type { Metadata } from "next";
import CheckoutQRWalletSection from "./_sections";

export const metadata: Metadata = {
  title: "Checkout: Pay with QR Code or Wallet Address | ChainMind",
};

export default async function CheckoutQRWallet() {
  return <CheckoutQRWalletSection />;
}
