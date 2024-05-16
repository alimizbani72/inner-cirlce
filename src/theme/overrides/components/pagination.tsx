import { paginationItemClasses } from "@mui/material/PaginationItem";
import type { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export function pagination(theme: Theme) {
  return {
    MuiPagination: {
      styleOverrides: {
        root: {
          ul: { gap: theme.spacing(1) },
          [`& .${paginationItemClasses.root}`]: {
            ...theme.typography["caption-medium"],
            margin: 0,
            color: theme.palette.grey.light,
            [`&.${paginationItemClasses.selected}`]: {
              color: theme.palette.common.white,
              backgroundColor: theme.palette.blue.dark,

              "&:hover": { backgroundColor: theme.palette.blue.light },
            },
            [`&.${paginationItemClasses.previousNext}`]: {
              backgroundColor: theme.palette.dark[3],
              color: theme.palette.common.white,
            },
          },
        },
      },
    },
  };
}
