import { Stack } from "@mui/material";
import type { Metadata } from "next";
import Notice from "./_sections/Notice";
import Table from "./_sections/Table";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Coin Reports",
};

export default async function CoinReports() {
  return (
    <Stack gap={3}>
      <Notice />

      <Table />
    </Stack>
  );
}
