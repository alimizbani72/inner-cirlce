import type { Metadata } from 'next';
import EducationSingleVideoSection from './_sections';

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Education: ${decodeURIComponent(id)}` };
}

export default async function EducationSingleVideoPage() {
  return <EducationSingleVideoSection />;
}
