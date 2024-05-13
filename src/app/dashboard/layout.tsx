import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Stack } from "@mui/material";
import DashboardHeader from "src/app/dashboard/_section/Header";
import DesktopSidebar from "src/app/_components/sidebar/Desktop";
import Scrollbar from "@/components/Scrollbar";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Chainmind" },
};

export type LayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <Stack direction={"row"} component="main">
      <DesktopSidebar />

      <Stack sx={{ flex: 1 }}>
        <DashboardHeader />

        {/* Main content */}
        <Scrollbar>
          <Stack height={{ md: "calc(100vh - 104px)" }}>{children}</Stack>
        </Scrollbar>
      </Stack>
    </Stack>
  );
}
