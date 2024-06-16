import { Stack } from "@mui/material";
import type { Metadata } from "next";
import Notice from "./_sections/Notice";
import Table from "./_sections/Table";
import LearningBanner from "./_sections/LearningBanner";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReports() {
  return (
    <Stack gap={3}>
      <LearningBanner />

      <Notice />

      <Table />
    </Stack>
  );
}
