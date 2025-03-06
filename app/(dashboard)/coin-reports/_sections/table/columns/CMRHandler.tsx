import Icon from '@/components/icon';
import { IconButton, Stack, Typography } from '@mui/material';
import type { Palette } from '@mui/material/styles';

import type { FC } from 'react';

type CMRHandlerProps = {
  value: number | null;
  percentChange?: number | null;
};

const CMRHandler: FC<CMRHandlerProps> = ({ value, percentChange }) => {
  let color = 'common.white';
  let iconName: 'ArrowUpIcon' | 'ArrowDownIcon' | null = null;

  if (percentChange && percentChange > 0) {
    color = 'success';
    iconName = 'ArrowUpIcon';
  } else if (percentChange && percentChange < 0) {
    color = 'danger';
    iconName = 'ArrowDownIcon';
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography
        variant="p2-medium"
        sx={{
          textAlign: 'left',
          minWidth: '40px',
        }}
      >
        {value?.toString()?.slice(0, 5)}
      </Typography>
      {percentChange !== null && (
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            ...(iconName
              ? {
                  path: { stroke: (theme) => (theme.palette[color as keyof Palette] as any)?.main },
                }
              : {}),
          }}
        >
          {iconName ? <Icon name={'ArrowDownIcon'} /> : <IconButton></IconButton>}
          <Typography
            sx={{ color: (theme) => (theme.palette[color as keyof Palette] as any)?.main }}
            variant="caption-semi-bold"
          >
            {percentChange?.toString()?.slice(0, 5)}
            {iconName ? '%' : ''}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default CMRHandler;
