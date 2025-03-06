'use client';

import { disclaimer } from '@/assets/html/disclaimer';
import ContentParser from '@app-components/ContentParser';
const DisclaimerSection = () => {
  return <ContentParser content={disclaimer} />;
};

export default DisclaimerSection;
