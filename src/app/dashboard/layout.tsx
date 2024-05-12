import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Stack } from "@mui/material";
import DashboardHeader from "src/app/dashboard/_section/Header";
import DesktopSidebar from "src/app/_components/sidebar/Desktop";
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
      <Stack sx={{ width: 248, height: "100vh", display: { md: "flex", xs: "none" } }}>
        <DesktopSidebar />
      </Stack>

      <Stack sx={{ flex: 1 }}>
        <DashboardHeader />

        {/* Main content */}
        {children}
      </Stack>
    </Stack>
  );
}
