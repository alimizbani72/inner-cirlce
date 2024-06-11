"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LandingHero from "./LandingHero";
import Opportunity from "./Opportunity";
import Problems from "./Problems";
import Solution from "./Solution";
import How from "./How";
import Scrollbar from "@/components/Scrollbar";
import Results from "./Results";
import WhyChainMind from "./WhyChainMind";

type Props = { isLogin: boolean };

const HomePageSection: FC<Props> = ({ isLogin }) => {
  return (
    <Scrollbar>
      <Stack height={"100vh"} component={"main"}>
        <Header isLogin={isLogin} />

        {/* Main Content */}
        <Stack alignItems={"center"}>
          <LandingHero />

          <Opportunity />

          <Problems />

          <Solution />

          <How />

          <Results />

          <WhyChainMind />
        </Stack>

        <Footer />
      </Stack>
    </Scrollbar>
  );
};

export default HomePageSection;
