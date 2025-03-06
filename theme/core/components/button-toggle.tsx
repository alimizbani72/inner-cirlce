import type { Theme, Components } from '@mui/material/styles';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
const sizeStyles = (theme: Theme) => ({
  small: {
    height: theme.spacing(4),
    padding: theme.spacing(0.5, 3),
  },
  medium: {
    height: theme.spacing(5),
    padding: theme.spacing(1, 4),
  },
  large: {
    height: theme.spacing(6),
    padding: theme.spacing(1.5, 4),
  },
});
const MuiToggleButton: Components<Theme>['MuiToggleButton'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      ...sizeStyles(theme).medium,
      textTransform: 'none',
      borderRadius: theme.spacing(3),

      ':hover': {
        backgroundColor: 'unset',
      },
    }),

    sizeSmall: ({ theme }) => sizeStyles(theme).small,
    sizeLarge: ({ theme }) => sizeStyles(theme).large,
  },
};

const MuiToggleButtonGroup: Components<Theme>['MuiToggleButtonGroup'] = {
  /** **************************************
   * STYLE
   *************************************** */
  defaultProps: { color: 'info', exclusive: true },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.spacing(3),
      border: `1px solid ${theme.palette.dark[3]}`,
    }),
    grouped: ({ theme }) => ({
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      [`&.${toggleButtonClasses.selected}`]: {
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.16)',
        backgroundColor: theme.palette.dark[3],
        color: theme.palette.common.white,
      },
      '&:not(:last-of-type)': { borderRight: `1px solid ${theme.palette.dark[3]}` },
    }),
  },
};

// ----------------------------------------------------------------------

export const toggleButton = { MuiToggleButton, MuiToggleButtonGroup };
