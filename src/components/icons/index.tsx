"use client";

import { useTheme } from "@mui/material/styles";
import IcomoonReact from "icomoon-react";
import type { FC } from "react";

import type { iconsType } from "./iconsNames";
import iconSet from "./icons.json";

export interface IconProps {
  color?: string;
  size?: string | number;
  name: iconsType;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, size = 24, className, color }) => {
  const theme = useTheme();
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color ? (theme.palette as any)?.[`${color.split(".")[0]}`][`${color.split(".")[1]}`] : null}
      size={size}
      icon={name as string}
    />
  );
};
