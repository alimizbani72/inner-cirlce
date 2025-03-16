import type { Components, Theme } from '@mui/material/styles';
const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography['caption-semi-bold'],
      color: theme.vars.palette.common.white,
    }),
  },
};

export const formLabel = { MuiFormLabel };
