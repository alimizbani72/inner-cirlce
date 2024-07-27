import type { Metadata } from "next";
import EducationSection from "./_section";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Education",
};

export default async function EducationCategories() {
  return <EducationSection />;
}
