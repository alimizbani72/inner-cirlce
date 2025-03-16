import TwoFASubmitter from '@app-components/TwoFASubmitter';
import DesktopSidebar from '@app-components/sidebar/Desktop';
import MobileDrawer from '@app-components/sidebar/MobileDrawer';
import { Box, Stack } from '@mui/material';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PaymentNotice from './_section/PaymentNotice';
import DashboardHeader from './dashboard/_section/Header';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | ChainMind' },
};

export type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function DashboardLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {modal}
      <TwoFASubmitter />
      <Box sx={{ display: 'flex', height: '100dvh' }}>
        {/* Desktop sidebar - only visible on md screens and above */}
        <Box
          component="aside"
          sx={{
            width: { md: 'auto' },
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <DesktopSidebar />
        </Box>

        <MobileDrawer />

        {/* Main content area */}
        <Stack
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Header with menu button */}
          <DashboardHeader />

          {/* Content area with scrolling */}
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <PaymentNotice />
            {children}
          </Box>
        </Stack>
      </Box>
    </>
  );
}
