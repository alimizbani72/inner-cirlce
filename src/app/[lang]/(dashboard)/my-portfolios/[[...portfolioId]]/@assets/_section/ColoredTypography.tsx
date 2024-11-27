import { Typography } from "@mui/material";
import type React from "react";
import numeral from "numeral";

interface ColoredTypographyProps {
  value: any;
  customColor?: string;
}

const ColoredTypography: React.FC<ColoredTypographyProps> = ({ value, customColor }) => {
  const color = Math.abs(value) === 0 ? "white" : value < 0 ? "error.main" : "success.main";
  const formattedValue = Math.abs(value) < 1 ? value : numeral(value).format("0,0.00");
  return (
    <Typography variant="p2-medium" color={customColor ? customColor : color} whiteSpace={"pre"}>
      ${formattedValue}
    </Typography>
  );
};

export default ColoredTypography;
