"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import type { PropsWithChildren } from "react";

const ProgressBarProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar height="3px" color="#FF409D" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default ProgressBarProvider;
