import { Stack } from "@mui/material";
import { useMemo, type FC } from "react";
import Scrollbar from "@/components/Scrollbar";
import PricingTable from "./PricingTable";
import SectionTitle from "../SectionTitle";
import LandingContainer from "../LandingContainer";
import PricingPlans from "./PricingPlans";
import FisherMan from "./FisherMan";
import { useTranslate } from "@/locales";

const plansName = ["Shrimp", "Fish", "Shark", "Whale"];

const rows = {
  "Standard Coinreport": ["20+", "20+", "20+", "20+"],
  "Coinreports (10x)": ["3", "10", "15", "20+"],
  "Coinreports (100x)": [false, false, false, "10+"],
  "Portfolio Strategies": ["3+", "3+", "6+", "8+"],
  "In depth Analysis": [true, true, true, true],
  "Telegram Channel": [true, true, true, true],
  "Early Access CM": [true, true, true, true],
  "Lifetime Subscriptions": [true, true, true, true],
  "Secret Gems": [false, false, false, "Unlimited"],
  Workshops: [false, false, false, "3"],
  "Inner Circle Group": [false, false, false, true],
  "BETA Tester Access": [false, false, false, true],
  "Special Bonuses": [false, false, false, true],
};

const Pricing: FC = () => {
  const { t } = useTranslate();
  const plans = useMemo(
    () => [
      {
        id: "Plankton",
        title: t("landingpricing.plankton"),
        image: "/assets/rive/plankton.riv",
        description: t("landingpricing.planktondescription"),
        cost: 0,
        onClick: () => ({}),
      },
      {
        id: "Shrimp",
        title: t("landingpricing.shrimp"),
        image: "/assets/rive/shrimp.riv",
        description: t("landingpricing.shrimpdescription"),
        cost: 532,
        onClick: () => ({}),
      },
      {
        id: "Fish",
        title: t("landingpricing.fish"),
        image: "/assets/rive/fish.riv",
        description: t("landingpricing.fishdescription"),
        cost: 2138,
        onClick: () => ({}),
      },
      {
        id: "Shark",
        title: t("landingpricing.Shark"),
        image: "/assets/rive/shark.riv",
        description: t("landingpricing.sharkdescription"),
        cost: 5349,
        onClick: () => ({}),
      },
      {
        id: "Whale",
        title: t("landingpricing.whale"),
        image: "/assets/rive/whale_animation.riv",
        description: t("landingpricing.whaledescription"),
        cost: 10702,
        onClick: () => ({}),
      },
    ],
    [t]
  );

  return (
    <Stack
      id="pricing"
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
