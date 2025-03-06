import type { Components, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    warning: false;
    success: false;
    info: false;
    tertiary: true;
  }
}

const MuiIconButton: Components<Theme>['MuiIconButton'] = {
  styleOverrides: {
    root: ({ ownerState }: { ownerState: any }) => {
      if (ownerState.color === 'default') {
        return {
          padding: '0 !important',
          height: '24px !important',
          width: '24px !important',
        };
      }
      return {};
    },
    sizeLarge: ({ theme }) => ({
      height: theme.spacing(6),
      width: theme.spacing(6),
      padding: theme.spacing(1.5),
    }),
    sizeMedium: ({ theme }) => ({
      height: theme.spacing(5),
      width: theme.spacing(5),
      padding: theme.spacing(1),
    }),
    sizeSmall: ({ theme }) => ({
      height: theme.spacing(4),
      width: theme.spacing(4),
      padding: theme.spacing(0.5),
    }),
  },
};

export const iconButton = { MuiIconButton };
