"use client";
import { privacyPolicy } from "@/assets/html/privacy";
import ContentParser from "@app/_components/ContentParser";
const PrivacySection = () => {
  return <ContentParser content={privacyPolicy} />;
};

export default PrivacySection;
