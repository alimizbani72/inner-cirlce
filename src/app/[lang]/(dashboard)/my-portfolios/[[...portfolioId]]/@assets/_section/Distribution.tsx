import { Typography } from "@mui/material";
import type React from "react";
import { parseToNumber } from "../../_section/utils";

interface DistributionProps {
  value: any;
}

const Distribution: React.FC<DistributionProps> = ({ value }) => {
  const roundedValue = Math.round(value * 100) / 100;
  const color = roundedValue === 0 ? "white" : roundedValue < 0 ? "error.main" : "success.main";

  return (
    <Typography variant="p2-medium" color={color}>
      {parseToNumber(value).toFixed(2)}%
    </Typography>
  );
};

export default Distribution;
