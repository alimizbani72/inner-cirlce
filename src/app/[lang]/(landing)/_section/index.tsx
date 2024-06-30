"use client";
import type { FC, PropsWithChildren } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import Header from "@app/_sections/Landing/Header";
import Footer from "@app/_sections/Landing/Footer";

const LadingLayoutSection: FC<PropsWithChildren<{ isLogin: boolean }>> = ({ children, isLogin }) => {
  return (
    <Scrollbar>
      <Stack height={"100vh"} component={"main"}>
        <Header isLogin={isLogin} />
        {children}
        <Footer />
      </Stack>
    </Scrollbar>
  );
};

export default LadingLayoutSection;
