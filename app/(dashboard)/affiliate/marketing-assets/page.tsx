import type { Metadata } from 'next';
import AffiliateMarketingAssetsSection from './_sections';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Marketing assets',
};

export default async function AffiliateMarketingAssets() {
  return <AffiliateMarketingAssetsSection />;
}
