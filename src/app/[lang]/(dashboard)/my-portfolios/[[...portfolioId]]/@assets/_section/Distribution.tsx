import { Typography } from "@mui/material";
import type React from "react";
import { parseToNumber } from "../../_section/utils";

interface DistributionProps {
  value: any;
}

const Distribution: React.FC<DistributionProps> = ({ value }) => {
  const parsedValue = parseToNumber(value);
  const displayValue = Math.abs(parsedValue) < 0.01 ? 0 : parsedValue;

  const color = displayValue === 0 ? "white" : displayValue < 0 ? "error.main" : "success.main";

  return (
    <Typography variant="p2-medium" color={color}>
      {displayValue.toFixed(2)}%
    </Typography>
  );
};

export default Distribution;
