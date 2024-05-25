// version : 24.2

import type { SvgIconProps } from "@mui/material";
import { SvgIcon } from "@mui/material";
import type { FC } from "react";

export type SvgBaseProps = {
  width?: string | number;
  height?: string | number;
  viewBox?: string;
};

const SvgWrapper: FC<SvgIconProps> = ({ children, width, height, viewBox, ...props }) => (
  <SvgIcon {...props} style={{ width: width || 24, height: height || 24 }} viewBox={viewBox || "0 0 24 24"}>
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      {children}
    </svg>
  </SvgIcon>
);

export default SvgWrapper;
