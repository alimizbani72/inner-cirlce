"use client";

import { alpha, styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

// ----------------------------------------------------------------------

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  const lightMode = theme.palette.mode === "light";

  return {
    "& #notistack-snackbar": {
      ...theme.typography.subtitle2,
      padding: 0,
      flexGrow: 1,
    },
    "&.notistack-MuiContent": {
      color: theme.palette.text.primary,
      // boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0.5, 2, 0.5, 0.5),
      backgroundColor: theme.palette.background.paper,
    },
    "&.notistack-MuiContent-default": {
      padding: theme.spacing(1, 2, 1, 1),
      color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
    },
    "&.notistack-MuiContent-success": {
      padding: "8px 16px",
      borderRadius: theme.spacing(4),
      backgroundColor: theme.palette.success.light,

      "#notistack-snackbar": {
        color: theme.palette.success.dark,
        ...theme.typography["medium-h6"],
      },
    },
    "&.notistack-MuiContent-error": {
      padding: "8px 16px",
      borderRadius: theme.spacing(4),
      backgroundColor: theme.palette.error.light,

      "#notistack-snackbar": {
        color: theme.palette.error.dark,
        ...theme.typography["medium-h6"],
      },
    },
    // '&.notistack-MuiContent-warning': {},
    // '&.notistack-MuiContent-info': {},
  };
});

// ----------------------------------------------------------------------

type StyledIconProps = {
  color: "info" | "success" | "warning" | "error";
};

export const CustomIcon = styled("span")<StyledIconProps>(({ color, theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1.5),
  borderRadius: "110px",
  color: color === "error" ? "white" : theme.palette[color].main,
  backgroundColor: color === "error" ? theme.palette[color].main : "white",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    borderRadius: "110px",
    inset: 0,
    border: `2px solid ${theme.palette[color].dark}`,
  },
}));

export const StyledIcon = styled("span")<StyledIconProps>(({ color, theme }) => ({
  width: 44,
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1.5),
  color: theme.palette[color].main,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette[color].main, 0.16),
}));
