"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LandingHero from "./LandingHero";
import Opportunity from "./Opportunity";
import Problems from "./Problems";

type Props = { isLogin: boolean };

const HomePageSection: FC<Props> = ({ isLogin }) => {
  return (
    <>
      <Header isLogin={isLogin} />

      {/* Main Content */}
      <Stack alignItems={"center"}>
        <LandingHero />

        <Opportunity />

        <Problems />
      </Stack>

      <Footer />
    </>
  );
};

export default HomePageSection;
