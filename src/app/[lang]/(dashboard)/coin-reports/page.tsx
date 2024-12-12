import CoinReportPage from "@dashboard/coin-reports/_sections";
import CoinReportTemplate from "@dashboard/coin-reports/_sections/Template";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReports() {
  return (
    <CoinReportTemplate>
      <CoinReportPage />
    </CoinReportTemplate>
  );
}
