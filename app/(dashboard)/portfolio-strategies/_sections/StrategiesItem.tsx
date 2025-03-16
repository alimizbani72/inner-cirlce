'use client';

import type { FC } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { flexItem } from '@/utils/grid';
import { useTranslate } from '@/locales';
import { toTitleCase } from '@/utils/change-case';
import ContentStack from '@app-components/ContentStack';
import RiveComp from '@/components/rive-loader';
import Icon from '@/components/icon';
import { useAppRouter } from '@/routes/hooks';

interface StrategiesItemProps {
  src: string;
  type: string;
  subtitle: string;
  upgrade?: boolean;
}

const StrategiesItem: FC<StrategiesItemProps> = ({ src, subtitle, type, upgrade }) => {
  const { t } = useTranslate();
  const { push } = useAppRouter();
  return (
    <ContentStack
      p={2}
      gap={1}
      direction={'row'}
      justifyContent={'space-between'}
      minHeight={160}
      minWidth={{ md: 360, xs: 'calc(100% - 24px)' }}
      sx={flexItem({ count: { lg: 3, md: 2 }, gap: 24 })}
    >
      <Box sx={{ aspectRatio: 1 }}>
        <RiveComp src={src} width={128} height={128} />
      </Box>

      <Stack p={1} flex={1}>
        <Typography variant="h4-semi-bold" textTransform={'uppercase'}>
          {toTitleCase(type)}
        </Typography>
        <Typography variant="p2-medium" textTransform={'uppercase'} color={'grey.dark'} mb={2}>
          {subtitle}
        </Typography>
        {upgrade ? (
          <Button
            href="/pricing"
            color="tertiary"
            sx={{
              px: { xs: '16px !important', sm: '32px !important' },
              'svg path': { fill: '#E68F0D !important' },
              whiteSpace: 'nowrap',
            }}
            startIcon={<Icon name="SubscriptionIcon" />}
            fullWidth
          >
            <Typography
              variant="p2-medium"
              sx={{
                background: (theme) => theme.palette.gradient.orange,
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
              }}
            >
              {t('button.upgrade')}
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={() => push(`/portfolio-strategies/${type}`)}
            color="tertiary"
            sx={{ whiteSpace: 'nowrap', px: { xs: '16px !important', sm: '32px !important' } }}
          >
            {t('button.seeStrategies')}
          </Button>
        )}
      </Stack>
    </ContentStack>
  );
};

export default StrategiesItem;
