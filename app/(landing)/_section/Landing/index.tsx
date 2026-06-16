"use client";

import { Stack } from "@mui/material";
import How from "./How";
import LandingHero from "./LandingHero";
import Opportunity from "./Opportunity";
import Pricing from "./Pricing";
import Problems from "./Problems";
import Results from "./Results";
import Solution from "./Solution";
import StayInTouch from "./StayInTouch";
import VisionMission from "./VisionMission";
import WhyChainMind from "./WhyChainMind";

import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { useAppSelector } from "@/lib/hooks";

const mockPages = {
  en: {
    docs: [
      {
        layout: [
          {
            blockType: "Hero",
            highlightText: "Welcome to ChainMind",
            title: "Unlock the Power of Smart Decisions",
            description:
              "Leverage advanced analytics and AI to make faster, smarter, and more confident decisions for your business.",
            buttonText: "Get Started",
            buttonLink: "/get-started",
          },
          {
            blockType: "Opportunity",
            blockTitle: "Opportunities",

            buttonText: "Get Started",
            buttonLink: "/start",
            cards: [
              {
                image: {
                  url: "/assets/images/opportunity1.png",
                },
                title: "Opportunity 1",
                description: "First opportunity description",
              },
              {
                image: {
                  url: "/assets/images/opportunity2.png",
                },
                title: "Opportunity 2",
                description: "Second opportunity description",
              },
              {
                image: {
                  url: "/assets/images/opportunity3.png",
                },
                title: "Opportunity 3",
                description: "Third opportunity description",
              },
            ],
          },
          {
            blockType: "Problem",
            highlightText: "The Problem",
            coloredTitle: "Why users struggle today",
            buttonText: "Learn More",
            buttonLink: "/problems",
            gridSections: [
              {
                icon: {
                  url: "/assets/icons/problem1.svg",
                },
                title: "Complex Systems",
                description: "Users face overly complex workflows and tools.",
              },
              {
                icon: {
                  url: "/assets/icons/problem2.svg",
                },
                title: "Lack of Insights",
                description: "No clear data or analytics to guide decisions.",
              },
              {
                icon: {
                  url: "/assets/icons/problem3.svg",
                },
                title: "Time Consuming",
                description: "Manual processes waste valuable time.",
              },
            ],
          },
        ],
      },
    ],
  },
};
const HomePageSection = () => {
  const lang = useAppSelector(selectLang);

  const { data, isFetching } = useMockPages(lang);
  const findContent = (type: string) =>
    data?.docs?.[0]?.layout?.find((item: any) => item.blockType === type) || {};
  return (
    <Stack alignItems={"center"}>
      <LandingHero {...(findContent("Hero") as any)} isLoading={isFetching} />

      <Opportunity
        {...(findContent("Opportunity") as any)}
        isLoading={isFetching}
      />

      <Problems {...(findContent("Problem") as any)} isLoading={isFetching} />

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

export const useMockPages = (locale: string) => {
  return {
    data: (mockPages as any)[locale] || mockPages.en,
    isFetching: false,
  };
};
