'use client';

import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

const COLOR = {
  danger: { bgColor: 'danger.main', textColor: 'common.white' },
  warning: { bgColor: 'warning.main', textColor: 'dark.1' },
  blue: { bgColor: 'blue.dark', textColor: 'common.white' },
  pink: { bgColor: 'pink.park', textColor: 'common.white' },
  white: { bgColor: 'common.white', textColor: 'dark.1' },
  success: { bgColor: 'success.main', textColor: 'common.white' },
};

interface StaticAlertProps {
  title: string;
  description: string;
  variant?: keyof typeof COLOR;
  onContinue?: VoidFunction;
}

const StaticAlert: FC<StaticAlertProps> = ({
  title,
  description,
  variant = 'danger',
  onContinue,
}) => {
  const { t } = useTranslate();
  return (
    <Stack
      gap={2}
      direction={{ md: 'row' }}
      alignItems={{ md: 'center' }}
      justifyContent={{ md: 'space-between' }}
      bgcolor={COLOR[variant].bgColor}
      px={{ md: 4, xs: 3 }}
      py={2}
    >
      <Stack gap={0.5}>
        <Stack direction={'row'} gap={2} alignItems={'center'}>
          <Icon
            name="NoInformationIcon"
            stroke={['warning', 'white'].includes(variant) ? COLOR[variant].textColor : undefined}
          />
          <Typography color={COLOR[variant].textColor} variant="p2-semi-bold">
            {title}
          </Typography>
        </Stack>
        <Typography color={COLOR[variant].textColor} variant="caption-regular">
          {description}
        </Typography>
      </Stack>

      {!!onContinue && (
        <Button color="tertiary" sx={{ width: { md: '152px', xs: '100%' } }} onClick={onContinue}>
          {t('button.continue')}
        </Button>
      )}
    </Stack>
  );
};

export default StaticAlert;
