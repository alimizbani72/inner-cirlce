import { Stack } from "@mui/material";
import type { Metadata } from "next";
import StrategiesItem from "./_sections/StrategiesItem";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Portfolio Strategies",
};

export default async function PortfolioStrategies() {
  return (
    <Stack
      sx={{ p: { md: 4, xs: 3 } }}
      gap={{ md: 3, xs: 2 }}
      direction={{ md: "row", xs: "column" }}
      flexWrap={{ md: "wrap", xs: undefined }}
      alignItems={{ md: "flex-start", xs: undefined }}
      justifyContent={"flex-start"}
    >
      <StrategiesItem
        title="Whale"
        subtitle="Strategy"
        riveSource="/assets/rive/whale_animation.riv"
        link="/portfolio-strategies/whale"
      />

      <StrategiesItem
        title="Whale"
        subtitle="Strategy"
        riveSource="/assets/rive/whale_animation.riv"
        link="/portfolio-strategies/whale"
      />
      <StrategiesItem
        title="Whale"
        subtitle="Strategy"
        riveSource="/assets/rive/whale_animation.riv"
        link="/portfolio-strategies/whale"
      />
      <StrategiesItem
        title="Whale"
        subtitle="Strategy"
        riveSource="/assets/rive/whale_animation.riv"
        link="/portfolio-strategies/whale"
      />
      <StrategiesItem
        title="Whale"
        subtitle="Strategy"
        riveSource="/assets/rive/whale_animation.riv"
        link="/portfolio-strategies/whale"
      />
    </Stack>
  );
}
