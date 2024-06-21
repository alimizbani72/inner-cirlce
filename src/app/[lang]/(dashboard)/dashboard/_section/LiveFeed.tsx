"use client";

import RiveComp from "@/components/RiveComp";
import ContentStack from "@app/_components/ContentStack";
import { useGlobalLiveFeedServiceGetGlobalsLiveFeed } from "@cms/queries";
import { Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import type { FC } from "react";

interface LiveFeedProps {}

const LiveFeed: FC<LiveFeedProps> = () => {
  const { lang } = useParams();
  const { data } = useGlobalLiveFeedServiceGetGlobalsLiveFeed({ locale: lang as string });

  return (
    <ContentStack sx={{ p: 1, pt: 3, gap: 1, height: "100%" }}>
      <Stack direction={"row"} justifyContent={"space-between"} px={2}>
        <Typography variant="p1-semi-bold">Live Feed</Typography>

        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <RiveComp src="/assets/rive/Pulsing_point_1.riv" width={16} height={16} />
          <Typography variant="p2-medium" color={"success.main"}>
            {data?.author}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ p: 2, borderRadius: 1.5, bgcolor: "dark.3", gap: 1, flex: 1 }}>
        <Typography variant="p1-semi-bold">{data?.title}</Typography>
        <Typography variant="p2-regular" color={"grey.light"}>
          {data?.text}
        </Typography>
      </Stack>
    </ContentStack>
  );
};

export default LiveFeed;
