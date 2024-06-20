import type { Metadata } from "next";
import EducationModuleSection from "./_sections";

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Education: ${params.slug?.replaceAll("-", " ")}` };
}

export default async function EducationVideos() {
  return <EducationModuleSection />;
}
