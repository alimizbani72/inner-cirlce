import AffCommissionsTab from '@dashboard/affiliate/_sections/Commissions';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Commissions',
};

export default async function CommissionsPage() {
  return <AffCommissionsTab />;
}
