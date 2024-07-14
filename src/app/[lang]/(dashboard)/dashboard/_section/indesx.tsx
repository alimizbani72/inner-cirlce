"use client";

import { Box, Stack } from "@mui/material";
import WelcomeBanner from "./WelcomeBanner";
import LiveFeed from "./LiveFeed";
import RoadMap from "./RoadMap";
import SocialMedia from "./SocialMedia";
import DropZone from "./DropZone";

// ----------------------------------------------------------------------

const DashboardSection = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <WelcomeBanner />
      <Stack p={{ md: 4, xs: 3 }} gap={3}>
        <Stack gap={3} direction={{ md: "row", xs: "column" }}>
          <Stack flex={1} width={{ md: "calc(50% - 32px)", xs: "calc(100vw - 48px)" }}>
            <DropZone />
          </Stack>
          <Stack flex={1}>
            <LiveFeed />
          </Stack>
        </Stack>
        <RoadMap />
        <SocialMedia />
      </Stack>
    </Box>
  );
};

export default DashboardSection;
