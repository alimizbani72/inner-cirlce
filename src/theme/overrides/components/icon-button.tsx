import type { Theme } from '@mui/material';
import { type ButtonPropsOverride, button } from './button';

// ----------------------------------------------------------------------

export function IconButton(theme: Theme) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonPropsOverride }) => ({
          border: '1px solid transparent',
          ...button(theme).MuiButton.styleOverrides.contained({ ownerState }),
          ...button(theme).MuiButton.styleOverrides.root({ ownerState })['.MuiButton-icon'],
        }),
        sizeLarge: { height: theme.spacing(6), width: theme.spacing(6), padding: theme.spacing(1.5) },
        sizeMedium: { height: theme.spacing(5), width: theme.spacing(5), padding: theme.spacing(1) },
        sizeSmall: { height: theme.spacing(4), width: theme.spacing(4), padding: theme.spacing(0.5) },
      },
    },
  };
}
