import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { IconButtonProps } from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';

import { bgBlur, varAlpha } from '@/theme/styles';
import Icon from '@/components/icon';

// ----------------------------------------------------------------------

export function DownloadButton({ sx, ...other }: ButtonBaseProps) {
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        p: 0,
        top: 0,
        right: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        opacity: 0,
        position: 'absolute',
        color: 'common.white',
        borderRadius: 'inherit',
        transition: theme.transitions.create(['opacity']),
        '&:hover': {
          ...bgBlur({ color: varAlpha(theme.vars.palette.grey['dark'], 0.64) }),
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      <Icon name="ArrowDownIcon" size={24} />
    </ButtonBase>
  );
}

// ----------------------------------------------------------------------

export function RemoveButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton
      size="small"
      sx={{
        p: 0.35,
        top: 4,
        right: 4,
        position: 'absolute',
        color: 'common.white',
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['dark'], 0.48),
        '&:hover': { bgcolor: (theme) => varAlpha(theme.vars.palette.grey['dark'], 0.72) },
        ...sx,
      }}
      {...other}
    >
      <Icon name="CloseIcon" size={12} />
    </IconButton>
  );
}
