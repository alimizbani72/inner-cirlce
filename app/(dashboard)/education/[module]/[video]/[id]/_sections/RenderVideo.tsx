'use client';

import Empty from '@/components/Empty';
import { useIsMobile } from '@/hooks/use-responsive';
import { selectStatus, selectVideoByTitle } from '@/lib/features/academy/educationSlice';
import { useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { formatTime } from '@/utils/format-time';
import ContentStack from '@app-components/ContentStack';
import { BulletIcon } from '@app-components/sidebar/Menu/Bullets';
import { Box, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { type FC, useEffect, useState } from 'react';
import ResourcesSelector from './ResourcesSelector';

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

  // Video player loading skeleton
  if (isVideoLoading) {
    return <ContentStack className="loading-skeleton" sx={{ aspectRatio: 16 / 9 }} />;
  }

  // No video URL - show upgrade message
  if (!video?.url) {
    return (
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        sx={{
          border: '1.5px solid',
          borderColor: 'dark.3',
          borderRadius: 2,
          aspectRatio: 16 / 9,
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
  }

  const videoRatio = videoContent ? videoContent.width / videoContent.height : 16 / 9;

  return (
    <Stack spacing={3}>
      {/* Video Player Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Video Player */}
        <VimeoPlayer
          sx={{
            iframe: {
              borderRadius: 2,
              aspectRatio: videoRatio,
              width: '100% !important',
              minHeight: 'max-content',
              height: 'auto !important',
              position: 'relative',
              zIndex: 1,
            },
          }}
          videoUrl={video?.url}
        />
      </Box>

      {/* Video Info Section */}
      <Stack spacing={2}>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isMobile ? 'flex-start' : 'center'}
          spacing={2}
        >
          {/* Title and author info */}
          <Stack gap={1}>
            <Typography variant="h4-semi-bold" textTransform={'capitalize'}>
              {decodeURIComponent(id as string)}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} gap={1} flexWrap="wrap">
              <Typography variant="caption-medium" color="grey.dark">
                {t('educationSingleVideoSection.by')}:{' '}
                <Typography component="span" variant="caption-medium" color="grey.light">
                  {video?.author}
                </Typography>
              </Typography>

              <BulletIcon />

              {videoContent && (
                <Typography variant="caption-medium" color="grey.dark">
                  {t('educationSingleVideoSection.duration')}:{' '}
                  <Typography component="span" variant="caption-medium" color="grey.light">
                    {formatTime(videoContent?.duration)}
                  </Typography>
                </Typography>
              )}
            </Stack>
          </Stack>

          {/* Resources dropdown */}
          <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
            <ResourcesSelector resources={video.resources} isMobile={isMobile} t={t} />
          </Box>
        </Stack>

        {/* Description */}
        <Box>
          <Typography variant="p2-semi-bold" color="grey.light" sx={{ mb: 1 }}>
            {t('educationSingleVideoSection.description')}
          </Typography>
          <Typography variant="p2-regular">{video.description}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RenderVideo;
