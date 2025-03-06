import AffPayoutsTab from '@dashboard/affiliate/_sections/Payouts';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Payouts',
};

export default async function PayoutsPage() {
  return <AffPayoutsTab />;
}
