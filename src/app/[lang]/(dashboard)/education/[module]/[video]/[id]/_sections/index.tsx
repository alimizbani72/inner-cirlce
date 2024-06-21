"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { useParams } from "next/navigation";
import { BulletIcon } from "@app/_components/sidebar/Menu/Bullets";
import VideoList from "./VideoList";
import dynamic from "next/dynamic";
import BreadCrumb from "@/components/breadcrumb";
import { useAppSelector } from "@/lib/hooks";
import { selectVideoByTitle } from "@/lib/features/academy/educationSlice";
import Empty from "@/components/Empty";
import Image from "@/components/Image";
import { formatTime } from "@/utils/format-time";

type VideoResponse = {
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  htmlEmbed: string;
  width: number;
  height: number;
  duration: number;
  uploadDate: string;
};

const VimeoPlayer = dynamic(() => import("@/components/VimeoPlayer"), { ssr: false });

const EducationSingleVideoSection: FC = () => {
  const [videoContent, setVideoContent] = useState<VideoResponse | null>(null);
  const { id, video: moduleName } = useParams();
  const video = useAppSelector((state) =>
    selectVideoByTitle(state)(decodeURIComponent(id as string), decodeURIComponent(moduleName as string))
  );

  useEffect(() => {
    if (video?.URL) {
      fetch(`https://vimeo.com/api/oembed.json?url=${video?.URL}`)
        .then((response) => response.json())
        .then((response) => {
          setVideoContent(response);
        });
    }
  }, [video]);

  usePageTitle({ title: `Education: ${decodeURIComponent(id as string)}` });

  return (
    <Stack p={{ md: 4, xs: 3 }} height={"100%"} direction={{ md: "row", xs: "column" }} gap={{ md: 3, xs: 4 }}>
      <Stack sx={{ flex: 8 / 12 }} gap={3}>
        <BreadCrumb />

        {video?.URL ? (
          <>
            <Box
              sx={{
                width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
                minHeight: { sm: 350, xs: 150 },
                position: "relative",
                borderRadius: 2,
              }}
            >
              <Image
                src="/logo/logo-type.svg"
                width="100%"
                height="100%"
                objectFit="contain"
                sx={{ inset: 0, position: "absolute", borderRadius: 2 }}
              />
              <VimeoPlayer
                sx={{
                  iframe: {
                    borderRadius: 2,
                    aspectRatio: 16 / 9,
                    width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
                    height: "auto !important",
                  },
                }}
                videoUrl={video?.URL}
              />
            </Box>

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

                {videoContent && (
                  <Typography variant="caption-medium" color="grey.dark">
                    DURATION:{" "}
                    <Typography variant="caption-medium" color="grey.light">
                      {formatTime(videoContent?.duration)}
                    </Typography>
                  </Typography>
                )}
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack
            width="100%"
            height="100%"
            alignItems="center"
            sx={{
              border: "1.5px solid",
              borderColor: "dark.3",
              borderRadius: 2,
              aspectRatio: 16 / 9,
              width: { md: "100% !important", xs: "calc(100vw - 48px) !important" },
              height: "auto !important",
            }}
          >
            <Empty
              sx={{ mt: 0, width: "100%", height: "100%" }}
              icon="Warning--colorful"
              title="You should upgrade your package to see this information"
            />
          </Stack>
        )}
      </Stack>

      <Stack sx={{ flex: 4 / 12 }}>
        <VideoList />
      </Stack>
    </Stack>
  );
};

export default EducationSingleVideoSection;
