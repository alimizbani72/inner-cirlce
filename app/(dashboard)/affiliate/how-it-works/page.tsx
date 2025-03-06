import type { Metadata } from 'next';
import AffiliateHowItWorksSection from './_sections';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | How it works',
};

export default async function AffiliateHowItWorks() {
  return <AffiliateHowItWorksSection />;
}
