'use client';
import { snipText } from '@/utils/string';
import { Box, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { selectVideos } from '@/lib/features/academy/educationSlice';
import { CMSDownloadURL } from '@/consts';
import Link from '@/components/link';
import Icon from '@/components/icon';
import { usePathname } from 'next/navigation';
import { Image } from '@/components/image';

type Props = { content: { [k: string]: any } };

const ModuleItem: FC<Props> = ({ content }) => {
  const videos = useAppSelector((state) => selectVideos(state)(decodeURIComponent(content.title)));
  const pathName = usePathname();
  return (
    <Stack
      borderRadius={2}
      border="1.5px solid"
      borderColor={'dark.3'}
      overflow={'hidden'}
      direction={{ md: 'row', xs: 'column' }}
      component={Link}
      href={`${pathName}/${encodeURIComponent(content.title)}/${encodeURIComponent(videos[0].title)}`}
    >
      <Box height={'104px'} width={{ md: '182px', xs: '100%' }}>
        <Image
          src={CMSDownloadURL(content.banner)}
          sx={{ objectFit: 'cover' }}
          width={'100%'}
          height={'100%'}
        />
      </Box>

      <Stack
        gap={1}
        flex={1}
        p={{ md: 3, xs: 2 }}
        direction={'row'}
        alignItems={'center'}
        borderLeft="1.5px solid"
        borderColor={'dark.3'}
        justifyContent="space-between"
      >
        <Stack gap={1}>
          <Typography variant="p1-medium" sx={snipText(1)}>
            {content.title}
          </Typography>
          <Typography variant="caption-medium" color={'grey.light'} sx={snipText(1)}>
            {content.description}
          </Typography>
        </Stack>

        <Stack>
          <Icon name="ArrowRightIcon" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ModuleItem;
