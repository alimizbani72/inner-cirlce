"use client";

import { Image } from "@/components/image";
import Link from "@/components/link";
import { CMSDownloadURL } from "@/consts";
import { useTranslate } from "@/locales";
import { useGetGlobalsSocialMedia } from "@/services/minecraft/default/default";

import type { Media } from "@app-components/CMSContentParser";
import ContentStack from "@app-components/ContentStack";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

const SocialMedia: FC = () => {
  // const lang = useAppSelector(selectLang);
  const { data, isFetching } = useGetGlobalsSocialMedia();
  const { t } = useTranslate();

  return (
    <ContentStack sx={{ gap: 3 }}>
      <Typography variant="p1-semi-bold">{t("socialMedia.title")}</Typography>

      <Stack
        sx={{
          gap: { md: 2, xs: 1 },
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        {isFetching
          ? Array.from({ length: 3 })?.map((_, index) => (
              <Stack key={index} flex={1}>
                <Box className="loading-skeleton" height={56} width="100%" />
              </Stack>
            ))
          : data?.data?.socialLinks?.map((i) => (
              <Stack
                key={i.id}
                gap={2}
                p={2}
                direction={"row"}
                borderRadius={1.5}
                bgcolor={"dark.3"}
                alignItems={"center"}
                justifyContent="flex-start"
                flex={1}
                href={i.url as string}
                sx={{ "&:hover": { textDecoration: "none" } }}
                component={Link}
                target="_blank"
              >
                <Image
                  src={CMSDownloadURL((i?.icon as Media)?.url!)}
                  width={24}
                  height={24}
                />
                <Typography variant="p2-medium">{i.name}</Typography>
              </Stack>
            ))}
      </Stack>
    </ContentStack>
  );
};

export default SocialMedia;
