import type { Metadata } from 'next';
import PortfolioStrategiesInnerSection from './_sections';

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{ slug: string }>; // Mark params as Promise
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Await the params
  return { title: `${slug.toLocaleUpperCase()} Strategy` };
}

export default function PortfolioStrategiesInner() {
  return <PortfolioStrategiesInnerSection />;
}
