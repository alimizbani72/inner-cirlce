"use client";

import ContentStack from "@app/_components/ContentStack";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import RoadMapItem from "./Item";
import { useTranslate } from "@/locales";
import Scrollbar from "@/components/Scrollbar";
import { useParams } from "next/navigation";
import { useRoadmapsServiceGetRoadmaps } from "@cms/queries";
import { CMSDownloadURL } from "@/consts";

interface RoadMapProps {}

const RoadMap: FC<RoadMapProps> = () => {
  const { lang } = useParams();
  const { data } = useRoadmapsServiceGetRoadmaps({ locale: lang as string });

  const { t } = useTranslate();
  if (!data?.docs?.length) {
    return null;
  }

  return (
    <ContentStack sx={{ gap: 3, pb: { xs: 3, md: 0 } }}>
      <Typography variant="p1-semi-bold">{t("roadMap.title")}</Typography>
      <Scrollbar>
        <Stack direction={{ xs: "column", md: "row" }} gap={{ md: 2, xs: 1 }}>
          {data?.docs.map((i, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 calc(33.33% - 12px)",
                display: "flex",
                pb: { xs: undefined, md: 3 },
              }}
            >
              <RoadMapItem
                title={i.title}
                date={i.dateOnly}
                image={CMSDownloadURL((i?.image as any)?.url!)}
                descriptionText={i?.descriptionText}
                status={i.status}
              />
            </Box>
          ))}
        </Stack>
      </Scrollbar>
    </ContentStack>
  );
};

export default RoadMap;
