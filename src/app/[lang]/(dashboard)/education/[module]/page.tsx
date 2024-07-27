import type { Metadata } from "next";
import EducationModuleSection from "./_sections";

// ----------------------------------------------------------------------

type Props = {
  params: { module: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Education: ${decodeURIComponent(params.module)}` };
}

export default async function EducationVideos() {
  return <EducationModuleSection />;
}
