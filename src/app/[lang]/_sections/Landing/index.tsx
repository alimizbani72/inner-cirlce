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
import { usePagesServiceGetPages } from "@cms/queries";
import type { pages } from "@cms/requests";
import { useAppSelector } from "@/lib/hooks";
import { selectLang } from "@/lib/features/dictionary/dicSlice";

const HomePageSection = () => {
  const lang = useAppSelector(selectLang);

  const { data } = usePagesServiceGetPages({ locale: lang });
  const findContent = (type: pages["layout"][number]["blockType"]) =>
    data?.docs?.[0]?.layout.find((item) => item.blockType === type);

  return (
    <Stack alignItems={"center"}>
      <LandingHero {...(findContent("Hero") as any)} />

      <Opportunity {...(findContent("Opportunity") as any)} />

      <Problems {...(findContent("Problem") as any)} />

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
