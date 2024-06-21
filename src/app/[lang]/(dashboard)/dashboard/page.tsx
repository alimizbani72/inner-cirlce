import { Box, Stack } from "@mui/material";
import type { Metadata } from "next";
import WelcomeBanner from "./_section/WelcomeBanner";
import LiveFeed from "./_section/LiveFeed";
import RoadMap from "./_section/RoadMap";
import SocialMedia from "./_section/SocialMedia";
import DropZone from "./_section/DropZone";
import StaticAlert from "@app/_components/StaticAlert";
import { getQueryClient } from "@app/_providers/customQueryClient";
import {
  prefetchUseGlobalLiveFeedServiceGetGlobalsLiveFeed,
  prefetchUseGlobalSocialMediaServiceGetGlobalsSocialMedia,
  prefetchUseRoadmapsServiceGetRoadmaps,
} from "@cms/queries/prefetch";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { RouteParamsType } from "@/routes/type";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard({ params }: RouteParamsType) {
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchUseRoadmapsServiceGetRoadmaps(queryClient, { locale: params.lang }),
    prefetchUseGlobalLiveFeedServiceGetGlobalsLiveFeed(queryClient, { locale: params.lang }),
    prefetchUseGlobalSocialMediaServiceGetGlobalsSocialMedia(queryClient, { locale: params.lang }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box sx={{ flex: 1 }}>
        <StaticAlert
          title="Incomplete Payment Alert"
          description="Your upgrade to the Whale Package is pending due to an incomplete payment.  Please complete your payment  to finalize upgrade."
        />

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
    </HydrationBoundary>
  );
}
