import TwoFASubmitter from '@app-components/TwoFASubmitter';
import DesktopSidebar from '@app-components/sidebar/Desktop';
import { Stack } from '@mui/material';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PaymentNotice from './_section/PaymentNotice';
import DashboardHeader from './dashboard/_section/Header';
import LayoutWrapper from '@dashboard-section/ScrollbarLayoutWraper';
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
      <Stack direction={'row'} component="main" height="100dvh">
        <DesktopSidebar />

        <LayoutWrapper>
          <DashboardHeader />
          {/* Main content */}
          <Stack
            className="no-scrollbar"
            sx={{
              overflow: 'auto',
            }}
          >
            <>
              <PaymentNotice />
              {children}
            </>
          </Stack>
        </LayoutWrapper>
      </Stack>
    </>
  );
}
