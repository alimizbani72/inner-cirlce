import CoinReportPage from '@dashboard/coin-reports/_sections';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Coin Reports',
};

export default async function CoinReports() {
  return <CoinReportPage />;
}
