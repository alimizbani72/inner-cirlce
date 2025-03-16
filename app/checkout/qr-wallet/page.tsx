import type { Metadata } from 'next';
import WalletWrapper from './_sections/WalletWrapper';

export const metadata: Metadata = {
  title: 'Checkout: Pay with QR Code or Wallet Address | ChainMind',
};

export default function CheckoutQRWallet() {
  return <WalletWrapper />;
}
