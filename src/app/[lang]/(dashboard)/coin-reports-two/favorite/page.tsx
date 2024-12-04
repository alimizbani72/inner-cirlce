import CoinReportFavoritePage from "@dashboard/coin-reports-two/_sections/favorite";
import CoinReportTemplate from "@dashboard/coin-reports-two/_sections/Template";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinFavoritePage() {
  return (
    <CoinReportTemplate>
      <CoinReportFavoritePage />
    </CoinReportTemplate>
  );
}
