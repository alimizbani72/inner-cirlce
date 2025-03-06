import type { Metadata } from 'next';
import AffiliateSection from './_sections';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Dashboard',
};

export default async function Affiliate() {
  return <AffiliateSection />;
}
