"use client";
import Icon from "@/components/icon";
import type { IconNames } from "@/components/icon/types";
import { Lightbox } from "@/components/lightbox";
import LoadingButton from "@/components/loading-button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useLightBox } from "@/hooks/useLightBox";
import { useTranslate } from "@/locales";
import {
  Button,
  IconButton,
  Stack,
  type SxProps,
  Typography,
} from "@mui/material";
import { type FC, useMemo } from "react";
import { useFileDownload, useZipFileDownload } from "./download-actions";

interface AssetCardProps {
  type?: "image" | "video" | "pdf" | "link";
  title?: string;
  description?: string;
  items?: string[];
  sx?: SxProps;
}

const icon: Record<string, IconNames> = {
  image: "ImageIcon",
  video: "PlayIcon",
  pdf: "PdfIcon",
  link: "LinkIcon",
};

const AssetCard: FC<AssetCardProps> = ({
  description,
  items = [],
  title,
  type = "image",
  sx,
}) => {
  const { t } = useTranslate();

  // ✅ safer slides
  const slides = useMemo(() => {
    if (!items.length) {
      return [];
    }

    if (type === "image") {
      return items.map((item) => ({ src: item }));
    }

    if (type === "video") {
      return items.map((item) => ({
        type: "video" as const,
        width: 1280,
        height: 720,
        sources: [{ src: item, type: "video/mp4" }],
      }));
    }

    return [];
  }, [items, type]);

  const lightbox = useLightBox(slides);
  const { isLoading, downloadFile } = useFileDownload();
  const { isLoading: isZipFileLoading, downloadZipFile } = useZipFileDownload();
  const { copy } = useCopyToClipboard();

  const firstItem = items[0];

  const handleCopy = () => {
    if (firstItem) {
      copy(firstItem);
    }
  };

  const handleDownload = () => {
    if (!items.length) {
      return;
    }

    if (type === "image") {
      return downloadZipFile(items);
    }

    return downloadFile(firstItem);
  };

  const handlePreview = () => {
    if (!slides.length) {
      return;
    }

    lightbox.onOpen(0 as any); // ✅ FIXED (was wrong before)
  };

  return (
    <>
      <Stack
        border="1.5px solid"
        borderColor="dark.3"
        borderRadius={1.5}
        p={2}
        gap={2}
        sx={sx}
      >
        {/* ICON */}
        <Stack
          width={48}
          height={48}
          bgcolor="dark.3"
          borderRadius={1}
          alignItems="center"
          justifyContent="center"
          sx={{ path: { stroke: "white" } }}
        >
          <Icon name={icon[type]} />
        </Stack>

        {/* TEXT */}
        <Stack gap={1}>
          <Typography variant="p2-medium">{title}</Typography>
          <Typography variant="caption-regular" color="grey.light">
            {description}
          </Typography>
        </Stack>

        {/* ACTIONS */}
        {type === "link" ? (
          <Button
            fullWidth
            color="tertiary"
            sx={{ mt: "auto", px: 2 }}
            endIcon={<Icon name="CopyIcon" />}
            onClick={handleCopy}
            disabled={!firstItem}
          >
            <Typography
              variant="p2-medium"
              color="blue.light"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {firstItem || "—"}
            </Typography>
          </Button>
        ) : (
          <Stack gap={1} direction="row" mt="auto" width={1}>
            <LoadingButton
              loading={isLoading || isZipFileLoading}
              fullWidth
              color="tertiary"
              startIcon={<Icon name="DownloadIcon" />}
              onClick={handleDownload}
              disabled={!items.length}
            >
              {t("marketingassetTab.dwonload")}
            </LoadingButton>

            {type === "pdf" ? (
              <IconButton
                color="tertiary"
                target="_blank"
                href={firstItem || "#"}
                disabled={!firstItem}
              >
                <Icon name="EyeOnIcon" />
              </IconButton>
            ) : (
              <IconButton
                color="tertiary"
                onClick={handlePreview}
                disabled={!slides.length}
              >
                <Icon name="EyeOnIcon" />
              </IconButton>
            )}
          </Stack>
        )}
      </Stack>

      {/* LIGHTBOX */}
      {["video", "image"].includes(type) && slides.length > 0 && (
        <Lightbox
          open={lightbox.open}
          close={lightbox.onClose}
          slides={slides}
          index={lightbox.selected}
          disableZoom
          disableCaptions
          disableSlideshow
          disableFullscreen
        />
      )}
    </>
  );
};

export default AssetCard;
