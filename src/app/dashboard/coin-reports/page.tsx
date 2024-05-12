import { Box } from "@mui/material";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReports() {
  return <Box sx={{ flex: 1 }}>{/* Main content */}</Box>;
}
