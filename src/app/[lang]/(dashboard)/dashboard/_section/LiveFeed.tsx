"use client";

import RiveComp from "@/components/RiveComp";
import ContentStack from "@app/_components/ContentStack";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface LiveFeedProps {}

const LiveFeed: FC<LiveFeedProps> = () => {
  return (
    <ContentStack sx={{ p: 1, pt: 3, gap: 1, height: "100%" }}>
      <Stack direction={"row"} justifyContent={"space-between"} px={2}>
        <Typography variant="p1-semi-bold">Live Feed</Typography>

        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <RiveComp src="/assets/rive/Pulsing_point_1.riv" width={16} height={16} />
          <Typography variant="p2-medium" color={"success.main"}>
            Christin Brom ...
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ p: 2, borderRadius: 1.5, bgcolor: "dark.3", gap: 1, flex: 1 }}>
        <Typography variant="p1-semi-bold">Crypto will grow up! Let's invest right now...</Typography>
        <Typography variant="p2-regular" color={"grey.light"}>
          We’ve analyzed the best crypto you can buy to share some insight into the market in 2024, how to evaluate
          crypto investments like a pro. Bitcoin has endured and grown over the past 15 years, has a clear use case and
          benefits greatly from widespread adoption, being the first crypto asset to have an approved spot Bitcoin ETF.{" "}
        </Typography>
      </Stack>
    </ContentStack>
  );
};

export default LiveFeed;
