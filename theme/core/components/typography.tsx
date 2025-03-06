import type { Components, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const MuiTypography: Components<Theme>['MuiTypography'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    paragraph: ({ theme }) => ({ marginBottom: theme.spacing(2) }),
    gutterBottom: ({ theme }) => ({ marginBottom: theme.spacing(1) }),
  },
  defaultProps: { variant: 'p2-medium' },
};

// ----------------------------------------------------------------------

export const typography = { MuiTypography };
