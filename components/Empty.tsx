'use client';

import type { BoxProps } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useTranslate } from '@/locales';
import Icon from './icon';
import type { IconNames } from './icon/types';

type Props = {
  icon?: IconNames;
  title?: string;
  subtitle?: string;
  sx?: BoxProps['sx'];
  IconsColor?: string;
};

const Empty: FC<Props> = ({ icon, title, subtitle, IconsColor, sx }) => {
  const { t } = useTranslate();

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: { md: 6 }, p: 6, ...sx }}>
      <Stack alignItems="center" justifyContent="center" borderRadius="110px" mb={3}>
        <Icon name={icon || 'WarningIcon'} size={60} stroke={IconsColor} />
      </Stack>

      <Typography variant="p1-semi-bold" color="white" textAlign="center">
        {title || t('empty.thereIsNothingToShow')}
      </Typography>

      {subtitle && (
        <Typography mt={1} color="grey.light" variant="p2-medium" textAlign="center">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default Empty;
