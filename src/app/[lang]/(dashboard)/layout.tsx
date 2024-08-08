import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Stack } from "@mui/material";
import DashboardHeader from "@app/(dashboard)/dashboard/_section/Header";
import DesktopSidebar from "@app/_components/sidebar/Desktop";
import Scrollbar from "@/components/Scrollbar";
import PaymentNotice from "./_section/PaymentNotice";
import TwoFASubmitter from "@app/_components/TwoFASubmitter";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function DashboardLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {modal}
      <TwoFASubmitter />
      <Stack direction={"row"} component="main">
        <DesktopSidebar />

        <Stack sx={{ flex: 1 }}>
          <DashboardHeader />

          {/* Main content */}
          <Scrollbar>
            <Stack height={{ md: "calc(100vh - 106px)" }}>
              <>
                <PaymentNotice />
                {children}
              </>
            </Stack>
          </Scrollbar>
        </Stack>
      </Stack>
    </>
  );
}
