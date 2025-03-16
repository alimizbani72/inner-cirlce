import type { Theme, Components, ComponentsVariants } from '@mui/material/styles';

import { paginationItemClasses } from '@mui/material/PaginationItem';

import { varAlpha, stylesMode } from '../../styles';

// ----------------------------------------------------------------------

// NEW VARIANT
declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    soft: true;
  }

  interface PaginationPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
}

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

// ----------------------------------------------------------------------

const softVariant: Record<string, ComponentsVariants<Theme>['MuiPagination']> = {
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) =>
      !ownerState.disabled && ownerState.variant === 'soft' && ownerState.color === color,
    style: ({ theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        [`&.${paginationItemClasses.selected}`]: {
          fontWeight: theme.typography.fontWeightSemiBold,
          color: theme.vars.palette[color].dark,
          backgroundColor: varAlpha(theme.vars.palette[color].main, 0.08),
          '&:hover': { backgroundColor: varAlpha(theme.vars.palette[color].main, 0.16) },
          [stylesMode.dark]: { color: theme.vars.palette[color].light },
        },
      },
    }),
  })),
  standardColor: [
    {
      props: ({ ownerState }) => ownerState.variant === 'soft' && ownerState.color === 'standard',
      style: ({ theme }) => ({
        [`& .${paginationItemClasses.root}`]: {
          [`&.${paginationItemClasses.selected}`]: {
            fontWeight: theme.typography.fontWeightSemiBold,
            backgroundColor: varAlpha(theme.vars.palette.grey['light'], 0.08),
            '&:hover': { backgroundColor: varAlpha(theme.vars.palette.grey['light'], 0.16) },
          },
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

const MuiPagination: Components<Theme>['MuiPagination'] = {
  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    /**
     * @variant soft
     */
    ...[...softVariant.standardColor!, ...softVariant.colors!],
  ],

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      ul: { gap: theme.spacing(1) },
      [`& .${paginationItemClasses.root}`]: {
        ...theme.typography['caption-medium'],
        margin: 0,
        color: theme.palette.grey.light,
        [`&.${paginationItemClasses.selected}`]: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.blue.dark,

          '&:hover': { backgroundColor: theme.palette.blue.light },
        },
        [`&.${paginationItemClasses.previousNext}`]: {
          backgroundColor: theme.palette.dark[3],
          color: theme.palette.common.white,
        },
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const pagination = { MuiPagination };
