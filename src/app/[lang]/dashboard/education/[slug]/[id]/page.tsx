import type { Metadata } from "next";
import EducationSingleVideoSection from "./_sections";

// ----------------------------------------------------------------------

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Education: ${params.id?.replaceAll("-", " ")}` };
}

export default async function EducationSingleVideoPage() {
  return <EducationSingleVideoSection />;
}
