import { Box } from "@mui/material";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  return <Box sx={{ flex: 1 }}>{/* Main content */}</Box>;
}
