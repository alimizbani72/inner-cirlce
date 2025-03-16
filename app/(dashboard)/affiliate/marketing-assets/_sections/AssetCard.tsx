'use client';
import { Button, IconButton, Stack, type SxProps, Typography } from '@mui/material';
import { useMemo, type FC } from 'react';
import { useFileDownload, useZipFileDownload } from './download-actions';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useTranslate } from '@/locales';
import { useLightBox } from '@/hooks/useLightBox';
import Icon from '@/components/icon';
import type { IconNames } from '@/components/icon/types';
import LoadingButton from '@/components/loading-button';
import { Lightbox } from '@/components/lightbox';
import type { MarketingAssetHttpPublishedMarketingAssetResponse } from '@/services/minecraft/minecraftAPI.schemas';

interface AssetCardProps extends MarketingAssetHttpPublishedMarketingAssetResponse {
  sx?: SxProps;
}
const icon: Record<string, string> = {
  image: 'ImageIcon',
  video: 'PlayIcon',
  pdf: 'PdfIcon',
  link: 'LinkIcon',
};

const AssetCard: FC<AssetCardProps> = ({ description, items, title, type, sx }) => {
  const { t } = useTranslate();
  const slides = useMemo(() => {
    if (type === 'image') {
      return items?.map((item) => ({ src: item }));
    }
    if (type === 'video') {
      return items?.map((item) => ({
        type: 'video' as any,
        width: 1280,
        height: 720,
        poster: 'video',
        sources: [{ src: item, type: 'video/mp4' }],
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
    if (type === 'image') {
      return downloadZipFile(items?.map((item) => item)!);
    }

    return downloadFile(items?.[0]!);
  };

  const handlePreview = () => {
    lightbox.onOpen(type === 'video' ? 'video' : items?.[0]!);
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
          sx={{ path: { stroke: 'white' } }}
        >
          <Icon name={icon[type!] as IconNames} />
        </Stack>

        <Stack gap={1}>
          <Typography variant="p2-medium">{title}</Typography>
          <Typography variant="caption-regular" color="grey.light">
            {description}
          </Typography>
        </Stack>

        {type === 'link' ? (
          <Button
            fullWidth
            color="tertiary"
            sx={{ mt: 'auto', px: 2 }}
            endIcon={<Icon name="CopyIcon" />}
            onClick={() => handleCopy(items?.[0]!)}
          >
            <Typography
              variant="p2-medium"
              color="blue.light"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {items?.[0]!}
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
            >
              {t('marketingassetTab.dwonload')}
            </LoadingButton>

            {type === 'pdf' ? (
              <IconButton color="tertiary" target="_blank" href={items?.[0]!}>
                <Icon name="EyeOnIcon" />
              </IconButton>
            ) : (
              <IconButton color="tertiary" onClick={handlePreview}>
                <Icon name="EyeOnIcon" />
              </IconButton>
            )}
          </Stack>
        )}
      </Stack>

      {!!['video', 'image'].includes(type!) && (
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
