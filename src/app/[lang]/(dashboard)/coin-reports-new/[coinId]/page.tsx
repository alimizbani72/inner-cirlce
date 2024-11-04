import { Stack } from "@mui/material";
import type { Metadata } from "next";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports Single",
};

export default async function CoinReportsSingleNew() {
  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      new coin single
    </Stack>
  );
}
