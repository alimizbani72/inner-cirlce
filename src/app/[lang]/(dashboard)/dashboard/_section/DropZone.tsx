"use client";

import type { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import RiveComp from "@/components/RiveComp";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
const DropZone: FC = () => {
  return (
    <Stack
      position="relative"
      overflow="hidden"
      borderRadius={2}
      border="1.5px solid"
      borderColor="dark.3"
      bgcolor="dark.2"
      flex={1}
      minHeight={{ md: "auto", xs: "350px" }}
    >
      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
          width: { md: 288, xs: 288 },
          height: { md: 288, xs: 288 },
          borderRadius: { md: "288px", xs: "288px" },
          position: "absolute",
          left: { md: "-144px", xs: "-144px" },
          top: { md: "-144px", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="/assets/texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
          width: { md: 288, xs: 288 },
          height: { md: 288, xs: 288 },
          borderRadius: { md: "288px", xs: "288px" },
          position: "absolute",
          right: { md: "-144px", xs: "-144px" },
          bottom: { md: "-144px", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Typography pt={3} px={3} pb={2} position="relative" variant="p1-semi-bold" color="white">
        Drop Zone
      </Typography>

      <img src="/assets/svg/drop-zone.svg" width="100%" height="100%" />

      <Stack
        sx={{
          aspectRatio: 1,
          position: "absolute",
          top: { md: 24, xs: 50 },
          right: { md: 24, xs: 0 },
          left: { md: "unset", xs: 0 },
          bottom: { md: 24 },
          alignItems: "center",
        }}
        width={{ md: 236, xs: 1 }}
        height={236}
      >
        <RiveComp src="/assets/rive/flying_box.riv" width={236} height={236} />
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          bottom: { md: 76, xs: 24 },
          left: { md: 64, xs: 0 },
          right: { md: "unset", xs: 0 },
          alignItems: "center",
        }}
      >
        <FlipClockCountdown
          to={new Date().getTime() + 1 * 3600 * 1000 + 5000}
          labelStyle={{ fontSize: 0 }}
          renderMap={[false, true, true, true]}
          digitBlockStyle={{
            width: 32,
            height: 48,
            fontSize: 32,
            fontWeight: 500,
            borderRadius: "6px",
            backgroundColor: "#565CE4",
          }}
          separatorStyle={{ size: 0 }}
          dividerStyle={{ color: "#4348AF", height: 1 }}
          spacing={{ clock: "8px", digitBlock: "4px" }}
          renderOnServer
        >
          Finished
        </FlipClockCountdown>
      </Stack>
    </Stack>
  );
};

export default DropZone;
