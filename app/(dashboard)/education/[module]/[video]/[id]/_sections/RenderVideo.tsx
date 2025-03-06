'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/lib/hooks';
import { selectStatus, selectVideoByTitle } from '@/lib/features/academy/educationSlice';
import Empty from '@/components/Empty';
import { formatTime } from '@/utils/format-time';
import { useTranslate } from '@/locales';
import { useIsMobile } from '@/hooks/use-responsive';
import { CMSDownloadURL } from '@/consts';
import { CustomMenuItem, CustomSelect } from '@app-components/CustomSelect';
import Link from '@/components/link';
import Icon from '@/components/icon';
import { BulletIcon } from '@app-components/sidebar/Menu/Bullets';
import { usePageTitle } from '@/hooks/use-page-title';
import { Image } from '@/components/image';
import ContentStack from '@app-components/ContentStack';

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

const VimeoPlayer = dynamic(() => import('@app-components/VimeoPlayer'), {
  ssr: false,
});

const RenderVideo: FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const [videoContent, setVideoContent] = useState<VideoResponse | null>(null);
  const { id, video: moduleName } = useParams();
  const [isFetchingVideo, setIsFetchingVideo] = useState(true);
  const isLoading = useAppSelector(selectStatus) === 'loading';
  const video = useAppSelector((state) =>
    selectVideoByTitle(state)(
      decodeURIComponent(id as string),
      decodeURIComponent(moduleName as string)
    )
  );

  useEffect(() => {
    if (!video?.url) {
      setIsFetchingVideo(false);
      return;
    }

    fetch(`https://vimeo.com/api/oembed.json?url=${video.url}`)
      .then((response) => response.json())
      .then(setVideoContent)
      .finally(() => setIsFetchingVideo(false));
  }, [video]);

  const isVideoLoading = isLoading || isFetchingVideo;
  usePageTitle({ title: `Education: ${decodeURIComponent(id as string)}` });

  if (isVideoLoading) {
    return <ContentStack className="loading-skeleton" sx={{ aspectRatio: 16 / 9 }} />;
  }

  return video?.url ? (
    <>
      <Box
        sx={{
          width: {
            md: '100% !important',
            xs: 'calc(100vw - 48px) !important',
          },
          minHeight: { sm: 350, xs: 150 },
          position: 'relative',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            margin: 'auto',
          }}
        >
          <Image
            src="/logo/logo-type.svg"
            sx={{
              borderRadius: 2,
            }}
          />
        </Box>
        <VimeoPlayer
          sx={{
            iframe: {
              borderRadius: 2,
              aspectRatio: 16 / 9,
              width: {
                md: '100% !important',
                xs: 'calc(100vw - 48px) !important',
              },
              minHeight: 'max-content',
              height: 'auto !important',
            },
          }}
          videoUrl={video?.url}
        />
      </Box>

      <Stack gap={1}>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent={'space-between'} gap={3}>
          <Stack gap={1}>
            <Typography variant="h4-semi-bold" textTransform={'capitalize'}>
              {decodeURIComponent(id as string)}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Typography variant="caption-medium" color="grey.dark">
                {t('educationSingleVideoSection.by')}:{' '}
                <Typography variant="caption-medium" color="grey.light">
                  {video?.author}
                </Typography>
              </Typography>

              <BulletIcon />

              {videoContent && (
                <Typography variant="caption-medium" color="grey.dark">
                  {t('educationSingleVideoSection.duration')}:{' '}
                  <Typography variant="caption-medium" color="grey.light">
                    {formatTime(videoContent?.duration)}
                  </Typography>
                </Typography>
              )}
            </Stack>
          </Stack>
          {!!video?.resources?.length && (
            <CustomSelect
              MenuProps={{
                PaperProps: {
                  sx: {
                    boxShadow: 'none',
                    backgroundColor: 'dark.2',
                    color: '#fff',
                  },
                },
              }}
              style={{ width: isMobile ? '100%' : '240px' }}
              value={1}
              id="resources-select"
            >
              <CustomMenuItem disabled value={1} sx={{ display: 'none' }}>
                <Typography variant="p2-medium">
                  {/* DICTIONARY */}
                  {t('educationSingleVideoSection.filesources')}
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
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{ width: '100%', p: 1 }}
                  >
                    <Typography variant="p2-medium" color="grey.light">
                      {item.fileName}
                    </Typography>
                    <Icon name={item.isFile ? 'DownloadIcon' : 'ArrowRightIcon'} />
                  </Stack>
                </CustomMenuItem>
              ))}
            </CustomSelect>
          )}
        </Stack>

        <Typography variant="p2-semi-bold" color="grey.light" sx={{ mt: 2 }}>
          {/* DICTIONARY */}
          {t('educationSingleVideoSection.description')}
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
        border: '1.5px solid',
        borderColor: 'dark.3',
        borderRadius: 2,
        aspectRatio: 16 / 9,
        width: {
          md: '100% !important',
          xs: 'calc(100vw - 48px) !important',
        },
        height: 'auto !important',
      }}
    >
      <Empty
        sx={{ mt: 0, width: '100%', height: '100%' }}
        IconsColor="warning.main"
        icon="WarningIcon"
        title={t('educationSingleVideoSection.upgradeMessage')}
      />
    </Stack>
  );
};

export default RenderVideo;
