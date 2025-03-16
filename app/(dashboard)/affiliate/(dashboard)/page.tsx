import AffiliateSection from '@dashboard/affiliate/_sections';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Dashboard',
};

export default async function Affiliate() {
  return <AffiliateSection />;
}
