import AffStatisticsTab from '@dashboard/affiliate/_sections/Statistics';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Affiliate | Statistics',
};

export default async function StatisticsPage() {
  return <AffStatisticsTab />;
}
