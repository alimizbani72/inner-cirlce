import { listItemIconClasses } from "@mui/material/ListItemIcon";
import type { Theme } from "@mui/material/styles";

//
import { buttonBaseClasses, listItemTextClasses } from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";

// ----------------------------------------------------------------------

export function dataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: `1.5px solid ${theme.palette.dark[3]}`,
          borderRight: "unset !important",
          [`& .${gridClasses["container--top"]} [role=row]`]: {
            background: theme.palette.dark[3],
            borderRadius: "unset",
          },
          [`& .${gridClasses["row--borderBottom"]} `]: {
            [`& .${gridClasses.columnHeader}, & .MuiDataGrid-filler`]: {
              borderBottom: "unset",
            },
          },
          // "& .MuiDataGrid-filler": {
          //   display: "none",
          // },
        },
        columnHeader: {
          color: theme.palette.grey.light,
          ...theme.typography["caption-medium"],
          [`&:not(.${gridClasses["columnHeader--sorted"]}) .${gridClasses.sortIcon}`]: {
            opacity: 1,
          },
        },
        cell: {
          color: theme.palette.grey.light,
        },
        row: {
          "--rowBorderColor": theme.palette.dark[3],
        },
        iconButtonContainer: {
          [`& .${buttonBaseClasses.root}`]: {
            color: theme.palette.grey.light,
          },
          visibility: "visible",
          width: "auto",
        },
        menuIcon: {
          [`& .${buttonBaseClasses.root}`]: {
            color: theme.palette.grey.light,
          },
        },
        menu: {
          [`& .${listItemTextClasses.root} .${listItemTextClasses.primary}, & .${listItemIconClasses.root} `]: {
            color: theme.palette.grey.dark,
          },
        },
      },
    },
  };
}
