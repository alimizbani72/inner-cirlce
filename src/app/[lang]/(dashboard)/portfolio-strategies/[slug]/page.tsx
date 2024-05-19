import type { Metadata } from "next";
import PortfolioStrategiesInnerSection from "./_sections";

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `${params.slug.toLocaleUpperCase()} Strategy` };
}

export default async function PortfolioStrategiesInner({ params }: Props) {
  return <PortfolioStrategiesInnerSection pageTitle={`${params.slug.toLocaleUpperCase()} Strategy`} />;
}
