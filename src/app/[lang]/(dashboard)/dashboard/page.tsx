import { Box, Stack } from "@mui/material";
import type { Metadata } from "next";
import WelcomeBanner from "./_section/WelcomeBanner";
import LiveFeed from "./_section/LiveFeed";
import RoadMap from "./_section/RoadMap";
import SocialMedia from "./_section/SocialMedia";
import DropZone from "./_section/DropZone";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard | Chainmind",
};

export default async function Dashboard() {
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
}
