// ----------------------------------------------------------------------

import type { Components, Theme } from '@mui/material/styles';

const MuiLoadingButton: Components<Theme>['MuiLoadingButton'] = {
  defaultProps: { variant: 'contained' },
  styleOverrides: {
    root: ({ theme }) => ({
      '.MuiLoadingButton-loadingIndicator': {
        color: theme.vars.palette.common.white,
        '& > svg': { fontSize: '16px !important' },
        'svg path, svg circle': {
          stroke: theme.vars.palette.common.white,
        },
        svg: { animation: 'spin 2s linear infinite' },
      },
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
        '&.MuiLoadingButton-loading': {
          color: 'transparent',
          '.MuiButton-icon': { display: 'none' },
        },
      },
    }),
  },
};

export const loadingButton = { MuiLoadingButton };
