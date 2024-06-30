"use clinet";
import { disclaimer } from "@/assets/html/disclaimer";
import ContentParser from "@app/_components/ContentParser";
const DisclaimerSection = () => {
  return <ContentParser content={disclaimer} />;
};

export default DisclaimerSection;
