import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Stack } from "@mui/material";
import DashboardHeader from "@app/(dashboard)/dashboard/_section/Header";
import DesktopSidebar from "@app/_components/sidebar/Desktop";
import Scrollbar from "@/components/Scrollbar";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { prefetchUseAccountServiceAuthUserinfoQuery } from "@minecraft/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
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
  await Promise.all([
    prefetchUseAccountServiceAuthUserinfoQuery(queryClient),
    // Add more prefetch queries here
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {modal}
      <Stack direction={"row"} component="main">
        <DesktopSidebar />

        <Stack sx={{ flex: 1 }}>
          <DashboardHeader />

          {/* Main content */}
          <Scrollbar>
            <Stack height={{ md: "calc(100vh - 106px)" }}>{children}</Stack>
          </Scrollbar>
        </Stack>
      </Stack>
    </HydrationBoundary>
  );
}
