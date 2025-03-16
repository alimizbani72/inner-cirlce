import AffTabs from '@dashboard/affiliate/_sections/AffTabs';
import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

// ----------------------------------------------------------------------

export default async function AffiliateDashboardLayout({ children }: PropsWithChildren) {
  return (
    <Stack flex={1} py={{ md: 4, xs: 3 }}>
      <AffTabs />
      {children}
    </Stack>
  );
}
