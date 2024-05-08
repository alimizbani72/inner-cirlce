import { Stack } from "@mui/material";

import type { LayoutProps } from "../layout";

export default function AuthLayout({ children }: LayoutProps) {
  return <Stack>{children}</Stack>;
}
