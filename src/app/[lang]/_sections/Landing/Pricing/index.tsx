import { Stack } from "@mui/material";
import type { FC } from "react";
import Scrollbar from "@/components/Scrollbar";
import PricingTable from "./PricingTable";
import SectionTitle from "../SectionTitle";
import LandingContainer from "../LandingContainer";
import PricingPlans from "./PricingPlans";
import FisherMan from "./FisherMan";

const plans = [
  {
    id: "Plankton",
    title: "Plankton",
    image: "/assets/rive/plankton.riv",
    description: "22 coin reports +3 strategies with low/medium/high risk",
    cost: 0,
    onClick: () => ({}),
  },
  {
    id: "Shrimp",
    title: "Shrimp",
    image: "/assets/rive/shrimp.riv",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: 500,
    onClick: () => ({}),
  },
  {
    id: "Fish",
    title: "Fish",
    image: "/assets/rive/fish.riv",
    description: "Swim into crypto. Tips and tricks for the ambitious fish.",
    cost: 2000,
    onClick: () => ({}),
  },
  {
    id: "Shark",
    title: "Shark",
    image: "/assets/rive/shark.riv",
    description: "Dive deep. Apex predator insights to rule the crypto sea.",
    cost: 5000,
    onClick: () => ({}),
  },
  {
    id: "Whale",
    title: "Whale",
    image: "/assets/rive/whale_animation.riv",
    description: "Make waves. Exclusive access for those ready to whale around.",
    cost: 10000,
    onClick: () => ({}),
  },
];

const plansName = ["Shrimp", "Fish", "Shark", "Whale"];
const rows = {
  "Coinreports (10x)": ["3", "10", "15", "20+"],
  "Coinreports (100x)": [false, false, false, "10+"],
  "Secret Gems": [false, false, false, "Unlimited"],
  "In depth Analysis": [true, true, true, true],
  Price: ["€497", "€1,997", "€4,997", "€9,997"],
};

const Pricing: FC = () => {
  return (
    <Stack
      pt={{ md: 20, xs: 14 }}
      pb={{ md: 9, xs: 14 }}
      width={"100%"}
      overflow={"hidden"}
      alignItems={"center"}
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
      <PricingPlans plans={plans} />

      <FisherMan />

      <LandingContainer gap={{ md: 6, xs: 4 }} alignItems={"center"}>
        <SectionTitle
          title={`Compare <span style="color: #565CE4">P</span>lans`}
          bigTypoColor="rgba(255, 255, 255, 0.02)"
          color="white"
          firsLetterColor="white"
        />

        <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
          <Stack maxWidth={"100vw"}>
            <Stack width={1168} px={3} pb={3}>
              <PricingTable plans={plansName} rows={rows} />
            </Stack>
          </Stack>
        </Scrollbar>
      </LandingContainer>
    </Stack>
  );
};

export default Pricing;
