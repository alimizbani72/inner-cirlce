import type { Theme } from "@mui/material/styles";

//
import { menuItem } from "@/theme/css";
import { menuClasses } from "@mui/material";

// ----------------------------------------------------------------------

export function menu(theme: Theme) {
  return {
    MuiMenu: {
      styleOverrides: {
        root: {
          [`& .${menuClasses.paper}`]: {
            backgroundColor: theme.palette.dark[3],
            color: theme.palette.common.white,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  };
}
