import type { Metadata } from 'next';
import EducationVideosSection from './_sections';

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{ video: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { video } = await params;
  return { title: `Education: ${decodeURIComponent(video)}` };
}

export default async function EducationVideos() {
  return <EducationVideosSection />;
}
