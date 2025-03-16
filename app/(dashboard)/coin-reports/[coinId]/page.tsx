import type { Metadata } from 'next';
import CoinReportDetailSection from './_section';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Coin Reports Single',
};

export default async function CoinReportsSingleNew() {
  return <CoinReportDetailSection />;
}
