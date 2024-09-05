import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import SettingsHeader from "./_section/Header";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: { default: "Settings", template: "%s | ChainMind" } };

export default async function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <Stack sx={{ flex: 1 }}>
      {/* Header and Tab bar*/}
      <SettingsHeader />

      {/* Tab content */}
      <Scrollbar>
        <Stack>{children}</Stack>
      </Scrollbar>
    </Stack>
  );
}
