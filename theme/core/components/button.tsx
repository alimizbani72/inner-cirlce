import { varAlpha } from '@/theme/styles';
import type { Components, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------
export const BUTTON_COLORS = ['primary', 'secondary', 'tertiary'] as const;

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    warning: false;
    success: false;
    info: false;
    tertiary: true;
  }
}

// ----------------------------------------------------------------------

const MuiButtonBase: Components<Theme>['MuiButtonBase'] = {
  styleOverrides: { root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }) },
};

// ----------------------------------------------------------------------

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: { variant: 'contained', color: 'primary' },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.common.white,
      border: '1.5px solid transparent',
      borderRadius: theme.spacing(3),
      ...theme.typography['p2-medium'],
      textTransform: 'none',
      boxShadow: 'unset',
      '&.Mui-disabled': {
        background: theme.vars.palette.grey.light,
        color: theme.vars.palette.grey.dark,
        border: 'unset',

        '.MuiButton-icon': {
          color: theme.vars.palette.grey.dark,
          'svg path, svg circle': {
            stroke: theme.vars.palette.grey.dark,
          },
        },
      },

      '&.MuiButton-containedTertiary': {
        background: theme.vars.palette.dark[1],
        border: `1.5px solid ${theme.vars.palette.dark[3]}`,
        '&:hover': {
          background: theme.vars.palette.dark[3],
          boxShadow: 'unset',
        },
      },
    }),

    sizeLarge: ({ theme }) => ({ height: theme.spacing(6), padding: theme.spacing(1.5, 4) }),
    sizeMedium: ({ theme }) => ({ height: theme.spacing(5), padding: theme.spacing(1, 4) }),
    sizeSmall: ({ theme }) => ({ height: theme.spacing(4), padding: theme.spacing(0.5, 3) }),

    containedPrimary: ({ theme }) => ({
      background: theme.vars.palette.gradient.blue,
      border: `1px solid ${varAlpha(theme.palette.common.black, 0.4)}`,
      '&:hover': {
        background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.blue.dark} 100%, ${theme.palette.blue.dark} 100%)`,
        boxShadow: 'unset',
      },
    }),

    containedSecondary: ({ theme }) => ({
      background: theme.vars.palette.gradient.sky,
      color: theme.vars.palette.dark[3],
      border: `1px solid ${varAlpha(theme.palette.common.black, 0.24)}`,
      boxShadow:
        '0px 0px 0px 2px rgba(255, 255, 255, 0.40) inset, 0px 4px 8px 0px rgba(0, 0, 0, 0.24)',
      '&:hover': {
        background: theme.vars.palette.gradient.sky,
        boxShadow: 'unset',
      },

      '.MuiButton-icon': {
        color: theme.vars.palette.dark[3],
        'svg path, svg circle': {
          stroke: theme.vars.palette.dark[3],
        },
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const button = { MuiButtonBase, MuiButton };
