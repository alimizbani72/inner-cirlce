"use client";

import RiveComp from "@/components/rive-loader";
import { useTranslate } from "@/locales";
import { useGetGlobalsLiveFeed } from "@/services/minecraft/default/default";
import ContentStack from "@app-components/ContentStack";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface LiveFeedProps {}

const LiveFeed: FC<LiveFeedProps> = () => {
  // const lang = useAppSelector(selectLang);
  const { data } = useGetGlobalsLiveFeed();
  const { t } = useTranslate();

  return (
    <ContentStack sx={{ p: 1, pt: 3, gap: 1, height: "100%" }}>
      <Stack direction={"row"} justifyContent={"space-between"} px={2}>
        <Typography variant="p1-semi-bold">{t("liveFeed.title")}</Typography>

        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <RiveComp
            src="/assets/rive/Pulsing_point_1.riv"
            width={16}
            height={16}
          />
          <Typography variant="p2-medium" color={"success.main"}>
            {data?.data?.author}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        sx={{ p: 2, borderRadius: 1.5, bgcolor: "dark.3", gap: 1, flex: 1 }}
      >
        <Typography variant="p1-semi-bold">{data?.data?.title}</Typography>
        <Typography variant="p2-regular" color={"grey.light"}>
          {data?.data?.text}
        </Typography>
      </Stack>
    </ContentStack>
  );
};

export default LiveFeed;
