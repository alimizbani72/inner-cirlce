import Icon from '@/components/icon';
import { Image } from '@/components/image';
import { useAppRouter } from '@/routes/hooks';
import { snipText } from '@/utils/string';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useParams, usePathname } from 'next/navigation';
import { useMemo, type FC } from 'react';

interface VideoItemProps {
  title: string;
  image?: string;
  completed?: boolean;
  watching?: boolean;
  hasDivider?: boolean;
}

const VideoItem: FC<VideoItemProps> = ({ image, title, completed, watching, hasDivider }) => {
  const { module, video } = useParams();
  const { push } = useAppRouter();
  const pathname = usePathname();

  const destination = useMemo(
    () => `/education/${module}/${video}/${encodeURIComponent(title as string)}/`,
    [pathname]
  );

  return (
    <>
      <Stack
        direction={'row'}
        alignItems="center"
        gap={2}
        py={2}
        sx={{ cursor: pathname !== destination ? 'pointer' : 'default' }}
        onClick={() => {
          if (pathname !== destination) {
            push(destination);
          }
        }}
      >
        <Stack width={'98px'} height={'53px'} justifyContent="center">
          <Image borderRadius={'8px'} src={image || '/logo/logo-type.svg'} />
        </Stack>

        <Stack direction={'row'} gap={1} flex={1} alignItems="center">
          <Typography variant="p2-medium" sx={snipText(2)} display="flex" alignItems="center">
            {title}
          </Typography>
          {(completed || watching) && (
            <Box ml={'auto'} width={24}>
              <Icon name="PlayIcon" />
            </Box>
          )}
        </Stack>
      </Stack>
      {hasDivider && (
        <Divider
          flexItem
          sx={{
            borderWidth: '1.5px',
          }}
        />
      )}
    </>
  );
};

export default VideoItem;
