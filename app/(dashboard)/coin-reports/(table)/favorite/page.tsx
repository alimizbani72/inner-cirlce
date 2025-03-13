import CoinReportFavoritePage from '@dashboard/coin-reports/_sections/favorite';
import type { Metadata } from 'next';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Coin Reports',
};

export default async function CoinFavoritePage() {
  return <CoinReportFavoritePage />;
}
