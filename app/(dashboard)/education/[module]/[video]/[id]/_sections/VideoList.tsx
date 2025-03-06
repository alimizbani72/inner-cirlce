import { Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import VideoItem from './VideoItem';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectStatus, selectVideos } from '@/lib/features/academy/educationSlice';
import { useTranslate } from '@/locales';
import ContentStack from '@app-components/ContentStack';
import Icon from '@/components/icon';
import { Scrollbar } from '@/components/scrollbar';

const VideoList = () => {
  const { video, id } = useParams();
  const isLoading = useAppSelector(selectStatus) === 'loading';
  const { t } = useTranslate();
  const videoList = useAppSelector((state) =>
    selectVideos(state)(decodeURIComponent(video as string))
  );

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <ContentStack
      borderRadius={{ md: 2 }}
      border={{ md: '1.5px solid' }}
      borderColor={{ md: 'dark.3' }}
      bgcolor={{ md: 'dark.2' }}
      p={{ md: 3 }}
    >
      <Typography variant="h4-semi-bold" mb={2}>
        {t('videoList.educationVideos')}
      </Typography>

      <TextField
        placeholder={t('videoList.searchPlaceholder')}
        sx={{
          '.MuiInputBase-root': {
            borderRadius: '28px !important',
            backgroundColor: 'dark.3',
            mb: 3,
          },
        }}
        slotProps={{
          input: {
            startAdornment: <Icon name="SearchIcon" stroke="grey.dark" />,
          },
        }}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      <Stack mx={'-24px'}>
        <Stack gap={2} maxHeight={{ md: '63vh' }} px={3}>
          {isLoading ? (
            <ContentStack
              className={isLoading ? 'loading-skeleton' : ''}
              sx={{ aspectRatio: 16 / 9 }}
            />
          ) : (
            <Scrollbar>
              {videoList
                .filter((vid) => vid?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()))
                .map((item, index, arr) => (
                  <Stack key={index}>
                    <VideoItem
                      {...item}
                      watching={item.title === decodeURIComponent(id as string)}
                      completed={false}
                      hasDivider={index !== arr.length - 1}
                    />
                  </Stack>
                ))}
            </Scrollbar>
          )}
        </Stack>
      </Stack>
    </ContentStack>
  );
};

export default VideoList;
