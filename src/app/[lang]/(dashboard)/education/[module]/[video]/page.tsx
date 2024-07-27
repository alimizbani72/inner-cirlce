import type { Metadata } from "next";
import EducationVideosSection from "./_sections";

// ----------------------------------------------------------------------

type Props = {
  params: { video: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Education: ${decodeURIComponent(params.video)}` };
}

export default async function EducationVideos() {
  return <EducationVideosSection />;
}
