"use client";
import type { FC, PropsWithChildren } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/styles/overlayscrollbars.css";

interface CustomScrollbarProps extends PropsWithChildren {
  options?: object;
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
