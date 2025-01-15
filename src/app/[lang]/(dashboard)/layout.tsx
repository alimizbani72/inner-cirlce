import Scrollbar from "@/components/Scrollbar";
import DashboardHeader from "@app/(dashboard)/dashboard/_section/Header";
import TwoFASubmitter from "@app/_components/TwoFASubmitter";
import DesktopSidebar from "@app/_components/sidebar/Desktop";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAffiliateServiceAffiliateMeQuery } from "@minecraft/queries/prefetch";
import { Stack } from "@mui/material";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import PaymentNotice from "./_section/PaymentNotice";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function DashboardLayout({ children, modal }: LayoutProps) {
  const queryClient = getQueryClient();
  await prefetchUseAffiliateServiceAffiliateMeQuery(queryClient);
  return (
    <>
      {modal}
      <TwoFASubmitter />
      <Stack direction={"row"} component="main">
        <DesktopSidebar />

        <HydrationBoundary state={dehydrate(queryClient)}>
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
        </HydrationBoundary>
      </Stack>
    </>
  );
}
