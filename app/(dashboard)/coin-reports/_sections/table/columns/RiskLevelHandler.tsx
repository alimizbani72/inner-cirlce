import { Typography } from "@mui/material";
import { riskLevelColor } from "../../consts";

interface RiskLevelHandlerProps {
  value: string;
}

const RiskLevelHandler = ({ value }: RiskLevelHandlerProps) => (
  <Typography
    variant="p2-medium"
    color={
      riskLevelColor[
        value?.toString()?.replace(" Risk", "") as keyof typeof riskLevelColor
      ]
    }
  >
    {value}
  </Typography>
);
export default RiskLevelHandler;
