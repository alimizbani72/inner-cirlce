import { Stack } from '@mui/material';
import type React from 'react';

type PortfolioLayoutProps = {
  children: React.ReactNode;
  history: React.ReactNode;
  assets: React.ReactNode;
  allocation: React.ReactNode;
};

export default function PortfolioLayout({
  children,
  allocation,
  history,
  assets,
}: PortfolioLayoutProps) {
  return (
    <Stack height={'100%'}>
      {children}
      <>
        <Stack direction={{ xs: 'column', md: 'row' }} px={{ xs: 3, md: 4 }} pb={3} spacing={3}>
          {history}
          {allocation}
        </Stack>
        {assets}
      </>
    </Stack>
  );
}
