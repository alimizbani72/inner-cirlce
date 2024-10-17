import type { Metadata } from "next";
import PortfolioSsection from "./_section";
export const metadata: Metadata = {
  title: "My Portfolio",
};

const MyPortfolioPage = () => {
  return <PortfolioSsection />;
};

export default MyPortfolioPage;
