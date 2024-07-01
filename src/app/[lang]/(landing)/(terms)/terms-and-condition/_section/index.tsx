"use client";
import { termsAndConditions } from "@/assets/html/terms";
import dynamic from "next/dynamic";
const ContentParser = dynamic(() => import("@app/_components/ContentParser"), { ssr: false });
const TermsSection = () => {
  return <ContentParser content={termsAndConditions} />;
};

export default TermsSection;
