import type { Metadata } from 'next';
import EducationModuleSection from './_sections';

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{ module: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module } = await params;
  return { title: `Education: ${decodeURIComponent(module)}` };
}

export default async function EducationVideos() {
  return <EducationModuleSection />;
}
