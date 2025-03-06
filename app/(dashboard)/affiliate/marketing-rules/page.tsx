import type { Metadata } from 'next';
import AffiliateMarketingRulesSection from './_sections';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Marketing rules',
};

export default async function AffiliateMarketingRules() {
  return <AffiliateMarketingRulesSection />;
}
