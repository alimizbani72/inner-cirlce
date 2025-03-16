import type { Metadata } from 'next';
import PricingSection from './_sections';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: 'Pricing', template: '%s | ChainMind' },
};

export default async function PricingPage() {
  return <PricingSection />;
}
