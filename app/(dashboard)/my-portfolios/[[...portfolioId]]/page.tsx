import type { Metadata } from 'next';
import PortfolioSection from './_section';
export const metadata: Metadata = {
  title: 'My Portfolio',
};

const MyPortfolioPage = () => {
  return <PortfolioSection />;
};

export default MyPortfolioPage;
