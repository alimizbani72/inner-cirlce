"use client";

import { domMax, LazyMotion, m } from "framer-motion";
import type { ReactNode } from "react";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: "100%" }}> {children} </m.div>
    </LazyMotion>
  );
}
