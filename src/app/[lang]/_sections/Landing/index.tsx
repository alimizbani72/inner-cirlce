"use client";

import { Stack } from "@mui/material";
import LandingHero from "./LandingHero";
import Opportunity from "./Opportunity";
import Problems from "./Problems";
import Solution from "./Solution";
import How from "./How";
import Results from "./Results";
import WhyChainMind from "./WhyChainMind";
import Pricing from "./Pricing";
import VisionMission from "./VisionMission";
import StayInTouch from "./StayInTouch";

const HomePageSection = () => {
  return (
    <Stack alignItems={"center"}>
      <LandingHero />

      <Opportunity />

      <Problems />

      <Solution />

      <How />

      <Results />

      <Pricing />

      <WhyChainMind />

      <VisionMission />

      <StayInTouch />
    </Stack>
  );
};

export default HomePageSection;
