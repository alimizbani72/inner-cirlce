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
import { useTranslate } from "@/locales";
import { useIsMobile } from "@/hooks/use-responsive";
import { CustomMenuItem, CustomSelect } from "@app/_components/CustomSelect";
import { Icon } from "@/components/icons";
import Link from "@/components/Link";
import { CMSDownloadURL } from "@/consts";

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
  const isMobile = useIsMobile();
  const [videoContent, setVideoContent] = useState<VideoResponse | null>(null);
  const { id, video: moduleName } = useParams();
  const video = useAppSelector((state) =>
    selectVideoByTitle(state)(decodeURIComponent(id as string), decodeURIComponent(moduleName as string))
  );
  const { t } = useTranslate();

  useEffect(() => {
    if (video?.url) {
      fetch(`https://vimeo.com/api/oembed.json?url=${video?.url}`)
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

        {video?.url ? (
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
                videoUrl={video?.url}
              />
            </Box>

            <Stack gap={1}>
              <Stack direction={isMobile ? "column" : "row"} justifyContent={"space-between"} gap={3}>
                <Stack gap={1}>
                  <Typography variant="h4-semi-bold" textTransform={"capitalize"}>
                    {decodeURIComponent(id as string)}
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Typography variant="caption-medium" color="grey.dark">
                      {t("educationSingleVideoSection.by")}:{" "}
                      <Typography variant="caption-medium" color="grey.light">
                        {video?.author}
                      </Typography>
                    </Typography>

                    <BulletIcon />

                    {videoContent && (
                      <Typography variant="caption-medium" color="grey.dark">
                        {t("educationSingleVideoSection.duration")}:{" "}
                        <Typography variant="caption-medium" color="grey.light">
                          {formatTime(videoContent?.duration)}
                        </Typography>
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <CustomSelect
                  disabled={!video?.resources?.length}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        boxShadow: "none",
                        backgroundColor: "dark.2",
                        color: "#fff",
                      },
                    },
                  }}
                  style={{ width: isMobile ? "100%" : "240px" }}
                  value={1}
                  id="resources-select"
                  placeholder="File sources"
                >
                  <CustomMenuItem disabled value={1} sx={{ display: "none" }}>
                    <Typography variant="p2-medium">
                      {/* DICTIONARY */}
                      File sources
                    </Typography>
                  </CustomMenuItem>
                  {video?.resources?.map((item, index) => (
                    <CustomMenuItem key={index}>
                      <Stack
                        component={Link}
                        href={item.isFile ? CMSDownloadURL(item.url) : item.url}
                        target="_blank"
                        download={item.isFile}
                        rel="noreferrer"
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{ width: "100%", p: 1 }}
                      >
                        <Typography variant="p2-medium" color="grey.light">
                          {item.fileName}
                        </Typography>
                        <Icon name={item.isFile ? "download" : "Arrow-right"} />
                      </Stack>
                    </CustomMenuItem>
                  ))}
                </CustomSelect>
              </Stack>

              <Typography variant="p2-semi-bold" color="grey.light" sx={{ mt: 2 }}>
                {/* DICTIONARY */}
                Description
              </Typography>
              <Typography variant="p2-regular">{video.description}</Typography>
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
              title={t("educationSingleVideoSection.upgradeMessage")}
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
