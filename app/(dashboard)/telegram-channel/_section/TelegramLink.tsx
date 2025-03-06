'use client';

import { Stack, Box, Typography } from '@mui/material';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useTranslate } from '@/locales';
import { useIsMobile } from '@/hooks/use-responsive';
import Icon from '@/components/icon';

const TelegramLink = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const { copy } = useCopyToClipboard();
  const link = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || '';
  const displayLink = `${link.replace('https://', '').slice(0, isMobile ? 13 : 17)}...`;

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{ border: '1.5px solid', borderColor: 'dark.3', borderRadius: 3.5, p: 2, py: 1.5 }}
      spacing={2}
    >
      <Stack direction={'row'} spacing={1}>
        <Icon name="LinkIcon" />
        <Typography variant="p2-medium">{displayLink}</Typography>
        <Box
          sx={{
            mt: 1.5,
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            bgcolor: 'dark.3',
          }}
        ></Box>
        <Stack
          direction={'row'}
          spacing={0.5}
          onClick={() => copy(link)}
          sx={{ cursor: 'pointer' }}
        >
          <Icon name="CopyIcon" />
          <Typography variant="p2-medium" sx={{ textTransform: 'uppercase' }}>
            {t('telegramChannel.copy')}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TelegramLink;
