import type { Metadata } from "next";
import PortfolioStrategiesSection from "./_sections";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Portfolio Strategies",
};

export default async function PortfolioStrategies() {
  return <PortfolioStrategiesSection />;
}
