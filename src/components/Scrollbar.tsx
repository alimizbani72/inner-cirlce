"use client";

import type { FC, PropsWithChildren } from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";
import type { PartialOptions } from "overlayscrollbars";

interface CustomScrollbarProps extends PropsWithChildren {
  options?: PartialOptions;
}

// ----------------------------------------------------------------------

const Scrollbar: FC<CustomScrollbarProps> = ({ children, options }) => {
  return (
    <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: "scroll" }, ...options }}>
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
