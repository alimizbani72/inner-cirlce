import type { Theme, Components } from '@mui/material/styles';

import { inputLabelClasses } from '@mui/material/InputLabel';

// ----------------------------------------------------------------------

const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography['p2-medium'],
      color: theme.palette.dark[1],
      ...theme.applyStyles('dark', {
        color: theme.palette.dark[3],
      }),

      [`&.${inputLabelClasses.shrink}`]: {
        ...theme.typography['p2-medium'],
        color: theme.palette.dark[1],

        [`&.${inputLabelClasses.focused}`]: { color: theme.palette.text.primary },
        [`&.${inputLabelClasses.error}`]: { color: theme.palette.error.main },
        [`&.${inputLabelClasses.disabled}`]: { color: theme.palette.text.disabled },
        [`&.${inputLabelClasses.filled}`]: { transform: 'translate(12px, 6px) scale(0.75)' },

        ...theme.applyStyles('dark', {
          color: theme.palette.dark[3],
        }),
      },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiFormHelperText: Components<Theme>['MuiFormHelperText'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { component: 'div' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      marginTop: theme.spacing(1),
      marginLeft: 0,
      marginRight: 0,
      ...theme.typography['p2-regular'],
    }),
  },
};

// ----------------------------------------------------------------------

const MuiFormControlLabel: Components<Theme>['MuiFormControlLabel'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: { marginLeft: -6 },
    label: ({ theme }) => ({ ...theme.typography['p2-regular'] }),
  },
};

// ----------------------------------------------------------------------

export const form = { MuiFormLabel, MuiFormHelperText, MuiFormControlLabel };
