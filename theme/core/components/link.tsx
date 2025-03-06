import type { Components, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const MuiLink: Components<Theme>['MuiLink'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { color: 'text.primary', underline: 'hover' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {},
};

// ----------------------------------------------------------------------

export const link = { MuiLink };
