'use client';

import { imprint } from '@/assets/html/imprint';
import ContentParser from '@app-components/ContentParser';
const ImprintSection = () => {
  return <ContentParser content={imprint} />;
};

export default ImprintSection;
