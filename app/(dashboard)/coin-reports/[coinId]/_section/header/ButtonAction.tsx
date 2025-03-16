'use client';
import useToggleState from '@/hooks/use-toggle-state';
import { Box, Button, IconButton, Stack } from '@mui/material';
import VideoModal from './VideoModal';
import { useTranslate } from '@/locales';
import Icon from '@/components/icon';

const ButtonAction = () => {
  const { t } = useTranslate();
  const [isOpenWatchVideo, toggleWatchVideo] = useToggleState();
  const [isOpenHowToBuy, toggleHowToBuy] = useToggleState();

  return (
    <>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Button
          color="tertiary"
          size="small"
          sx={{ whiteSpace: 'pre', px: { xs: '12px', md: '24px' } }}
          onClick={toggleWatchVideo}
        >
          {t('coinReportSingleView.watchVideo')}
        </Button>
        <Button
          color="tertiary"
          size="small"
          sx={{ whiteSpace: 'pre', px: { xs: '12px', md: '24px' } }}
          onClick={toggleHowToBuy}
        >
          {t('coinReportSingleView.howTobuy')}
        </Button>
        <Box sx={{ p: 0.3, borderRadius: '50%', border: '1px solid', borderColor: 'dark.3' }}>
          <IconButton>
            <Icon name="WebssiteIcon" />
          </IconButton>
        </Box>
      </Stack>
      {isOpenHowToBuy && (
        <VideoModal
          title={t('coinReportSingleView.howTobuy')}
          videoLink="https://vimeo.com/971459462?share=copy"
          open={isOpenHowToBuy}
          close={toggleHowToBuy}
        />
      )}
      {isOpenWatchVideo && (
        <VideoModal
          title={t('coinReportSingleView.watchVideo')}
          videoLink="https://vimeo.com/971459462?share=copy"
          open={isOpenWatchVideo}
          close={toggleWatchVideo}
        />
      )}
    </>
  );
};

export default ButtonAction;
