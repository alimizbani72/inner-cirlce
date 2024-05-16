"use client";

import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { useParams } from "next/navigation";
import VimeoPlayer from "@/components/VimeoPlayer";
import { BulletIcon } from "@app/_components/sidebar/Menu/Bullets";

const EducationSingleVideoSection: FC = () => {
  const { id, slug } = useParams();
  usePageTitle({ title: `Education: ${id?.toString()?.replaceAll("-", " ")}` });

  return (
    <Stack p={{ md: 4, xs: 3 }} height={"100%"} direction={{ md: "row", xs: "column" }} gap={{ md: 3, xs: 4 }}>
      <Stack sx={{ flex: 8 / 12 }} gap={3}>
        {/* Breadcrumb */}
        <Stack direction={"row"} gap={1}>
          <Typography variant="caption-medium" color="grey.light">
            Education
          </Typography>
          <Typography variant="caption-medium" color="grey.light">{`>`}</Typography>
          <Typography variant="caption-medium" textTransform={"capitalize"} color="grey.light">
            {slug?.toString()?.replaceAll("-", " ")}
          </Typography>
          <Typography variant="caption-medium">{`>`}</Typography>
          <Typography variant="caption-medium" textTransform={"capitalize"}>
            {id?.toString()?.replaceAll("-", " ")}
          </Typography>
        </Stack>

        <VimeoPlayer
          sx={{
            iframe: {
              borderRadius: 2,
              aspectRatio: 16 / 9,
              width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
              height: "auto !important",
            },
          }}
          videoId={76979871}
        />

        <Stack gap={1}>
          <Typography variant="h4-semi-bold" textTransform={"capitalize"}>
            {id?.toString()?.replaceAll("-", " ")}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography variant="caption-medium" color="grey.dark">
              BY:{" "}
              <Typography variant="caption-medium" color="grey.light">
                ChainMind
              </Typography>
            </Typography>

            <BulletIcon />

            <Typography variant="caption-medium" color="grey.dark">
              DURATION:{" "}
              <Typography variant="caption-medium" color="grey.light">
                01:30
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={{ flex: 4 / 12 }}>{/* TODO: Video list */}</Stack>
    </Stack>
  );
};

export default EducationSingleVideoSection;
