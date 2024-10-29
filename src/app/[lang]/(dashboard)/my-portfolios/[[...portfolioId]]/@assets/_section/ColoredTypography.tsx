import { Typography } from "@mui/material";
import numeral from "numeral";
import type React from "react";

interface ColoredTypographyProps {
  value: number | string;
  dolloarSign?: boolean;
  hasPercentage?: boolean;
}

const ColoredTypography: React.FC<ColoredTypographyProps> = ({ value, dolloarSign, hasPercentage }) => {
  const numericValue = parseFloat(value as string);
  const roundedValue = Math.round(numericValue * 100) / 100;
  const color = roundedValue === 0 ? "white" : roundedValue < 0 ? "error.main" : "success.main";

  return (
    <Typography variant="p2-medium" color={color}>
      {dolloarSign && "$"}
      {numeral(value).format("0,0.00")}
      {hasPercentage && "%"}
    </Typography>
  );
};

export default ColoredTypography;
