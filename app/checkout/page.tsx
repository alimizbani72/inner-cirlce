import type { Metadata } from 'next';
import CheckoutSection from './_sections';

export const metadata: Metadata = {
  title: 'Checkout | ChainMind',
};

export default async function Checkout() {
  return <CheckoutSection />;
}
