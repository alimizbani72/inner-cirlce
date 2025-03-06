import { Stack } from '@mui/material';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import TwoFASubmitter from '@app-components/TwoFASubmitter';
import DesktopSidebar from '@app-components/sidebar/Desktop';
import DashboardHeader from './dashboard/_section/Header';
import PaymentNotice from './_section/PaymentNotice';
import ScrollbarLayoutWraper from './_section/ScrollbarLayoutWraper';
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
      <Stack direction={'row'} component="main">
        <DesktopSidebar />

        <Stack sx={{ flex: 1 }}>
          <DashboardHeader />
          <ScrollbarLayoutWraper>
            {/* Main content */}
            <Stack>
              <>
                <PaymentNotice />
                {children}
              </>
            </Stack>
          </ScrollbarLayoutWraper>
        </Stack>
      </Stack>
    </>
  );
}
