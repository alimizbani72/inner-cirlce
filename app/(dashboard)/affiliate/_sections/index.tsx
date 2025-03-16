'use client';

import AFDashboardTab from '@dashboard/affiliate/_sections/Dashboard';
import { Stack } from '@mui/material';
import type { FC } from 'react';

const AffiliateSection: FC = () => {
  return (
    <Stack flex={1} py={{ md: 4, xs: 3 }}>
      <AFDashboardTab />
    </Stack>
  );
};

export default AffiliateSection;
