import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import type { MarketingAssetResponse } from "@minecraft/requests";
import { Button, IconButton, Stack, type SxProps, Typography } from "@mui/material";
import { useMemo, type FC } from "react";
import { useFileDownload, useZipFileDownload } from "./download-actions";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { LoadingButton } from "@mui/lab";
import { Lightbox } from "@/components/lightbox";
import { useLightBox } from "@/hooks/useLightBox";

interface AssetCardProps extends MarketingAssetResponse {
  sx?: SxProps;
}
const icon: Record<string, string> = {
  image: "image",
  video: "Play",
  pdf: "PDF",
  link: "Link",
};

const AssetCard: FC<AssetCardProps> = ({ description, items, title, type, sx }) => {
  const slides = useMemo(() => {
    if (type === "image") {
      return items?.map((item) => ({ src: item.item! }));
    }
    if (type === "video") {
      return items?.map((item) => ({
        type: "video" as any,
        width: 1280,
        height: 720,
        poster: "video",
        sources: [{ src: item.item!, type: "video/mp4" }],
      }));
    }

    return [];
  }, [items]);

  const lightbox = useLightBox(slides || []);
  const { isLoading, downloadFile } = useFileDownload();
  const { isLoading: isZipFileLoading, downloadZipFile } = useZipFileDownload();
  const { copy } = useCopyToClipboard();
  const handleCopy = (link: string) => {
    copy(link);
  };

  const handleDownload = () => {
    if (type === "image") {
      return downloadZipFile(items?.map((item) => item.item!)!);
    }

    return downloadFile(items?.[0]?.item!);
  };

  const handlePreview = () => {
    lightbox.onOpen(type === "video" ? "video" : items?.[0]?.item!);
  };

  return (
    <>
      <Stack border="1.5px solid" borderColor="dark.3" borderRadius={1.5} p={2} gap={2} sx={sx}>
        <Stack
          width={48}
          height={48}
          bgcolor="dark.3"
          borderRadius={1}
          alignItems="center"
          justifyContent="center"
          sx={{ path: { stroke: "white" } }}
        >
          <Icon name={icon[type!] as iconsType} />
        </Stack>

        <Stack gap={1}>
          <Typography variant="p2-medium">{title}</Typography>
          <Typography variant="caption-regular" color="grey.light">
            {description}
          </Typography>
        </Stack>

        {type === "link" ? (
          <Button
            fullWidth
            color="info"
            sx={{ mt: "auto", px: 2 }}
            endIcon={<Icon name="Copy" />}
            onClick={() => handleCopy(items?.[0]?.item!)}
          >
            <Typography variant="p2-medium" color="blue.light" textOverflow="ellipsis" overflow="hidden">
              {items?.[0]?.item}
            </Typography>
          </Button>
        ) : (
          <Stack gap={1} direction="row" mt="auto" width={1}>
            <LoadingButton
              loading={isLoading || isZipFileLoading}
              fullWidth
              color="info"
              startIcon={<Icon name="download" />}
              onClick={handleDownload}
            >
              Download
            </LoadingButton>

            {type === "pdf" ? (
              <IconButton color="info" target="_blank" href={items?.[0]?.item!}>
                <Icon name="Eye-On" />
              </IconButton>
            ) : (
              <IconButton color="info" onClick={handlePreview}>
                <Icon name="Eye-On" />
              </IconButton>
            )}
          </Stack>
        )}
      </Stack>

      {!!["video", "image"].includes(type!) && (
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
