import { Stack } from "@mui/material";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReportsNew() {
  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      new coin reports
    </Stack>
  );
}
