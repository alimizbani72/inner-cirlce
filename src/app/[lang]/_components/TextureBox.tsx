import { Box, Stack } from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import AnimalCard from "./AnimalCard";

const TextureBox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, #779DFF 0%, #565CE4 100%)",
          position: "absolute",
          width: "100%",
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
        }}
        justifyContent={"center"}
        gap={3}
      >
        <Box sx={{ position: "relative", pb: 10 }}>{children}</Box>
        <img
          src="/assets/svg/Flares.svg"
          style={{ width: "100%", height: "100%", position: "absolute", objectFit: "cover" }}
        />
        <img
          src="/assets/svg/frame2.svg"
          style={{ width: "100%", height: "100vh", position: "absolute", objectFit: "cover" }}
        />
        <img
          src="/assets/png/noise.png"
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            objectFit: "cover",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
        <Stack direction={"row"} justifyContent={"space-between"} sx={{ position: "relative", zIndex: 2, mx: "-20px" }}>
          <AnimalCard name="Plankton" src="/assets/rive/plankton.riv" />
          <AnimalCard name="Shrimp" src="/assets/rive/fisher_man.riv" />
          <AnimalCard name="Fish" src="/assets/rive/whale_animation.riv">
            <img
              src="/assets/svg/Coin 2.svg"
              style={{ width: "50%", position: "absolute", top: "-15%", left: "-20%" }}
            />
          </AnimalCard>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} sx={{ position: "relative", zIndex: 2 }}>
          <AnimalCard sx={{ mr: "12%" }} name="Shark" src="/assets/rive/shark.riv">
            <img
              src="/assets/svg/Coin 3.svg"
              style={{ width: "50%", position: "absolute", top: "-20%", left: "-20%" }}
            />
          </AnimalCard>
          <AnimalCard name="Whale" src="/assets/rive/whale_animation.riv">
            <img
              src="/assets/svg/Coin 1.svg"
              style={{ width: "40%", position: "absolute", bottom: "-15%", left: "-15%" }}
            />
          </AnimalCard>
        </Stack>
      </Stack>
    </Box>
  );
};
export default TextureBox;
