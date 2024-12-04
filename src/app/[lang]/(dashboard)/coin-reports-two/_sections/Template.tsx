import CoinReportToggle from "@dashboard/coin-reports-two/_sections/CoinReportToggle";
import LearningBanner from "@dashboard/coin-reports-two/_sections/LearningBanner";
import CoinReportNotice from "@dashboard/coin-reports-two/_sections/Notice";
import { Stack } from "@mui/material";
import type { PropsWithChildren } from "react";
// ----------------------------------------------------------------------

export default async function CoinReportTemplate({ children }: PropsWithChildren) {
  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      <LearningBanner />

      <CoinReportNotice />

      <CoinReportToggle>{children}</CoinReportToggle>
    </Stack>
  );
}
