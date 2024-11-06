import { useIsMobile } from "@/hooks/use-responsive";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
const levels = [
  { baseColor: "#111229", highlightColor: "#FF3D3D", label: "very strong sell" },
  { baseColor: "#14162E", highlightColor: "#F96110", label: "strong sell" },
  { baseColor: "#252740", highlightColor: "#E98A17", label: "sell" },
  { baseColor: "#42435D", highlightColor: "#F7C31A", label: "neutral" },
  { baseColor: "#5A5A72", highlightColor: "#79B303", label: "buy" },
  { baseColor: "#7A7C97", highlightColor: "#03B375", label: "strong buy" },
  { baseColor: "#9799B4", highlightColor: "#04AEAE", label: "very strong buy" },
];

type Props = {
  signal: number;
};
const Entry = ({ signal }: Props) => {
  const isMobile = useIsMobile();
  return (
    <Stack direction={isMobile ? "column" : "row"} spacing={1} alignItems={isMobile ? "start" : "center"}>
      <Typography color={"grey.light"} whiteSpace={"pre"} variant={"p1-semi-bold"} textTransform={"uppercase"}>
        E/E Signal:
      </Typography>
      <Stack direction="row" spacing={0.1} alignItems="center">
        {levels.map((level, index) => {
          const isActive = index === signal;
          const displayColor = isActive ? level.highlightColor : level.baseColor;
          const displayLabel = isActive ? level.label : null;
          return (
            <Box
              key={index}
              sx={{
                width: isActive ? { xs: "170px", md: "144px" } : "16px",
                height: "32px",
                bgcolor: displayColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: index === 0 ? "4px 0 0 4px" : index === levels.length - 1 ? "0 4px 4px 0" : 0,
              }}
            >
              {displayLabel && (
                <Typography variant={"caption-semi-bold"} color="white" textTransform={"uppercase"}>
                  {displayLabel}
                </Typography>
              )}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Entry;
