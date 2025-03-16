import Icon from '@/components/icon';
import Link from '@/components/link';
import { snipText } from '@/utils/string';
import { Stack, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

type Props = { content: { [k: string]: any } };

const VideoItem: FC<Props> = ({ content }) => {
  const pathname = usePathname();
  return (
    <Stack
      borderRadius={2}
      border="1.5px solid"
      borderColor={'dark.3'}
      overflow={'hidden'}
      direction="row"
      component={Link}
      href={`${pathname}/${encodeURIComponent(content.title)}`}
      gap={1}
      flex={1}
      p={{ md: 3, xs: 2 }}
      alignItems={'center'}
      justifyContent="space-between"
    >
      <Stack gap={1}>
        <Typography variant="p1-medium">{content.title}</Typography>
        <Typography variant="caption-medium" color={'grey.light'} sx={snipText(1)}>
          {content.description}
        </Typography>
      </Stack>

      <Stack>
        <Icon name="ArrowRightIcon" />
      </Stack>
    </Stack>
  );
};

export default VideoItem;
