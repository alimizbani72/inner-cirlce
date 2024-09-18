import { Icon } from "@/components/icons";
import { Box } from "@mui/material";
import { useMemo } from "react";
type Props = {
  totalTime: number;
  remainingTime: number;
};
const CircularIcon = ({ totalTime, remainingTime }: Props) => {
  const remainingPercentage = useMemo(() => (remainingTime / totalTime) * 100, [remainingTime, totalTime]);

  const conicGradient = useMemo(() => {
    return `conic-gradient(#00B171 ${remainingPercentage}%, #14162E ${remainingPercentage}% 100%)`;
  }, [remainingPercentage]);

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: conicGradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "85%",
          height: "85%",
          borderRadius: "50%",
          backgroundColor: "dark.2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Icon name="Time" />
      </Box>
    </Box>
  );
};

export default CircularIcon;
