import type { Theme, Components } from '@mui/material/styles';

import { tableRowClasses } from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';

import { varAlpha } from '../../styles';

// ----------------------------------------------------------------------

const MuiTableContainer: Components<Theme>['MuiTableContainer'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: {
      position: 'relative',
      [`& td.${tableCellClasses.root}:not(.${tableCellClasses.head})`]: {
        minWidth: 100,
      },
    },
  },
};

// ----------------------------------------------------------------------

const MuiTable: Components<Theme>['MuiTable'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: () => ({}),
  },
};

// ----------------------------------------------------------------------

const MuiTableRow: Components<Theme>['MuiTableRow'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      [`&.${tableRowClasses.selected}`]: {
        backgroundColor: varAlpha(theme.palette.primary.dark, 0.04),
        '&:hover': {
          backgroundColor: varAlpha(theme.palette.primary.dark, 0.08),
        },
      },
      '&:last-of-type': {
        [`& .${tableCellClasses.root}`]: {
          borderColor: 'transparent',
        },
      },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiTableCell: Components<Theme>['MuiTableCell'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: {
      borderBottomStyle: 'dashed',
    },
    head: ({ theme }) => ({
      fontSize: 14,
      color: theme.vars.palette.text.secondary,
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: theme.vars.palette.background.default,
      textWrapMode: 'nowrap',
    }),
    paddingCheckbox: ({ theme }) => ({
      paddingLeft: theme.spacing(1),
    }),
  },
};

// ----------------------------------------------------------------------

const MuiTablePagination: Components<Theme>['MuiTablePagination'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: {
      width: '100%',
    },
    toolbar: {
      height: 64,
    },
    actions: {
      marginRight: 8,
    },
    select: ({ theme }) => ({
      paddingLeft: 8,
      '&:focus': {
        borderRadius: theme.shape.borderRadius,
      },
    }),
    selectIcon: {
      right: 4,
      width: 16,
      height: 16,
      top: 'calc(50% - 8px)',
    },
  },
};

// ----------------------------------------------------------------------

export const table = {
  MuiTable,
  MuiTableRow,
  MuiTableCell,
  MuiTableContainer,
  MuiTablePagination,
};
