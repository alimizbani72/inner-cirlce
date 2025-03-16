import type { Theme, Components } from '@mui/material/styles';

import { menuItem } from '../../styles';
import { menuClasses } from '@mui/material';

// ----------------------------------------------------------------------

const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: { root: ({ theme }) => ({ ...menuItem(theme) }) },
};
const MuiMenu: Components<Theme>['MuiMenu'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${menuClasses.paper}`]: {
        backgroundColor: theme.palette.dark[3],
        color: theme.palette.common.white,
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const menu = { MuiMenuItem, MuiMenu };
