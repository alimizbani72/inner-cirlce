import { Stack } from "@mui/material";
import type { Metadata } from "next";
import StrategiesItem from "./_sections/StrategiesItem";
import { plans } from "@/configs/plans";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Portfolio Strategies",
};

const myPlan = "plankton";

export default async function PortfolioStrategies() {
  return (
    <Stack
      sx={{ p: { md: 4, xs: 3 } }}
      gap={{ md: 3, xs: 2 }}
      direction={{ md: "row", xs: "column" }}
      flexWrap={{ md: "wrap", xs: undefined }}
      alignItems={{ md: "flex-start", xs: undefined }}
      justifyContent="flex-start"
    >
      {Object.entries(plans).map(([key, value]) => (
        <StrategiesItem subtitle="Strategy" src={value.rive} type={key} upgrade={myPlan !== key} />
      ))}
    </Stack>
  );
}
