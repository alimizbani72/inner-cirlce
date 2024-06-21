"use client";

import ContentStack from "@app/_components/ContentStack";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import RoadMapItem from "./Item";
import { useRoadmapsServiceGetRoadmaps } from "@cms/queries";
import { useParams } from "next/navigation";

interface RoadMapProps {}

const RoadMap: FC<RoadMapProps> = () => {
  const { lang } = useParams();
  const { data } = useRoadmapsServiceGetRoadmaps({ locale: lang as string });

  if (!data?.docs?.length) {
    return null;
  }

  return (
    <ContentStack sx={{ gap: 3 }}>
      <Typography variant="p1-semi-bold">Road Map</Typography>

      <Stack
        sx={{
          gap: { md: 2, xs: 1 },
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        {data?.docs.map((i, index) => (
          <RoadMapItem key={index} {...i} isOdd={!!(index % 2)} />
        ))}
      </Stack>
    </ContentStack>
  );
};

export default RoadMap;
