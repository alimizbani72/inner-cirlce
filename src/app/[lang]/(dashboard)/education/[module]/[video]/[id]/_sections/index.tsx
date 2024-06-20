"use client";

import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { useParams } from "next/navigation";
import { BulletIcon } from "@app/_components/sidebar/Menu/Bullets";
import VideoList from "./VideoList";
import dynamic from "next/dynamic";
import BreadCrumb from "@/components/breadcrumb";
import { useAppSelector } from "@/lib/hooks";
import { selectVideoByTitle } from "@/lib/features/academy/educationSlice";

const VimeoPlayer = dynamic(() => import("@/components/VimeoPlayer"), { ssr: false });

const EducationSingleVideoSection: FC = () => {
  const { id } = useParams();
  const video = useAppSelector((state) => selectVideoByTitle(state)(decodeURIComponent(id as string)));

  usePageTitle({ title: `Education: ${decodeURIComponent(id as string)}` });

  return (
    <Stack p={{ md: 4, xs: 3 }} height={"100%"} direction={{ md: "row", xs: "column" }} gap={{ md: 3, xs: 4 }}>
      <Stack sx={{ flex: 8 / 12 }} gap={3}>
        <BreadCrumb />

        <VimeoPlayer
          sx={{
            iframe: {
              borderRadius: 2,
              aspectRatio: 16 / 9,
              width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
              height: "auto !important",
            },
          }}
          videoId={video?.URL as any}
        />

        <Stack gap={1}>
          <Typography variant="h4-semi-bold" textTransform={"capitalize"}>
            {decodeURIComponent(id as string)}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography variant="caption-medium" color="grey.dark">
              BY:{" "}
              <Typography variant="caption-medium" color="grey.light">
                {video?.author}
              </Typography>
            </Typography>

            <BulletIcon />

            {/* <Typography variant="caption-medium" color="grey.dark">
              DURATION:{" "}
              <Typography variant="caption-medium" color="grey.light">
                01:30
              </Typography>
            </Typography> */}
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={{ flex: 4 / 12 }}>
        <VideoList />
      </Stack>
    </Stack>
  );
};

export default EducationSingleVideoSection;
