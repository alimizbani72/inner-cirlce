'use client';
import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

const ErrorSection: FC = () => {
  const { t } = useTranslate();
  const { refresh } = useRouter();

  return (
    <Stack
      flex={1}
      p={3}
      alignItems="center"
      justifyContent="center"
      height={'100vh'}
      sx={{
        bgcolor: 'dark.1',
      }}
    >
      <Stack mt={5} mb={3} direction="row">
        <Typography variant="h1-bold">{5}</Typography>
        <Typography
          variant="h1-bold"
          sx={{
            color: 'rgba(255, 255, 255, 0.40)',
          }}
        >
          {0}
        </Typography>
        <Typography variant="h1-bold">{3}</Typography>
      </Stack>
      <Typography variant="h3-semi-bold">{t('errorPage.title')}</Typography>
      <Typography textAlign="center" variant="h4-medium" pb={3} color="grey.light">
        {t('errorPage.description')}
      </Typography>

      <Button
        onClick={() => {
          refresh();
        }}
        startIcon={<Icon name="MoreRoundIcon" />}
        color="secondary"
      >
        {t('errorPage.refresh')}
      </Button>
    </Stack>
  );
};

export default ErrorSection;
