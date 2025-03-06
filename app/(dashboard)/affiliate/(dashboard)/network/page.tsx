import AffNetworkTab from '@dashboard/affiliate/_sections/Network';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Network',
};

export default async function NetworkPage() {
  return <AffNetworkTab />;
}
