import { listItemIconClasses } from "@mui/material/ListItemIcon";
import type { Theme } from "@mui/material/styles";

//
import { buttonBaseClasses, listItemTextClasses, tablePaginationClasses } from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";

// ----------------------------------------------------------------------

export function dataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: `1.5px solid ${theme.palette.dark[3]}`,
          borderRight: "unset !important",
          [`& .${gridClasses.footerContainer}`]: {
            minHeight: 64,
          },
          [`& .${gridClasses["columnSeparator--sideRight"]}`]: {
            display: "none",
          },
          [`& .${gridClasses.filler}`]: {
            display: "none",
          },
          [`& .${gridClasses["columnHeader--sortable"]}[aria-sort="ascending"]`]: {
            "& svg > path:first-child": {
              stroke: theme.palette.common.white,
            },
          },
          [`& .${gridClasses["columnHeader--sortable"]}[aria-sort=descending]`]: {
            "& svg > path:last-child": {
              stroke: theme.palette.common.white,
            },
          },
          [`& .${gridClasses["container--top"]} [role=row]`]: {
            background: theme.palette.dark[3],
            borderRadius: "unset",
          },
          [`& .${gridClasses["row--borderBottom"]} `]: {
            [`& .${gridClasses.columnHeader}, & .MuiDataGrid-filler`]: {
              borderBottom: "unset",
            },
          },
          [`& .${tablePaginationClasses.spacer}`]: { display: "none" },
          [`& .${tablePaginationClasses.toolbar}`]: {
            color: theme.palette.common.white,
            minHeight: 64,
            justifyContent: "center",
            [`& .${tablePaginationClasses.actions} > button`]: {
              color: theme.palette.common.white,
              "&.Mui-disabled": {
                opacity: 0.2,
              },
            },
            [`& .${tablePaginationClasses.input}`]: {
              [`& .${tablePaginationClasses.select}`]: {
                color: theme.palette.common.white,
                marginRight: theme.spacing(0.5),
              },
              [`& .${tablePaginationClasses.selectIcon}`]: {
                color: theme.palette.common.white,
              },
            },
          },
          [`& .${gridClasses.overlayWrapper}`]: {
            [`& .${gridClasses.overlay}`]: {
              backgroundColor: "unset",
            },
          },
        },
        columnHeader: {
          color: theme.palette.grey.light,
          ...theme.typography["caption-medium"],
          "&:focus-within": {
            outline: "unset",
          },
        },
        cell: {
          color: theme.palette.grey.light,
          display: "flex",
          alignItems: "center",
          "&:focus-within": {
            outline: "unset",
          },
        },
        row: {
          "--rowBorderColor": theme.palette.dark[3],
          "&:hover": {
            backgroundColor: theme.palette.dark[3],
            cursor: "pointer",
          },
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
