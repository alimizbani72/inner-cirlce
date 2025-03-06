import Template from '@dashboard/affiliate/_sections/AffTemplate';
import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import KYCWrapper from '@app-components/KYCWrapper';
import LearningBanner from '@app-components/LearningBanner';
import AffiliateHeader from './_sections/Header';
// ----------------------------------------------------------------------

export default async function AffiliateLayout({ children }: PropsWithChildren) {
  return (
    <Stack flex={1} py={{ md: 4, xs: 3 }}>
      {/* Header */}
      <Stack gap={4}>
        <LearningBanner />
        <AffiliateHeader />
      </Stack>
      {/* Tabs */}
      <Template />
      <KYCWrapper />
      {children}
    </Stack>
  );
}
