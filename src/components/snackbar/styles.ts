"use client";

import { alpha, styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

// ----------------------------------------------------------------------

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  return {
    "& #notistack-snackbar": {
      padding: 0,
      flexGrow: 1,
      color: theme.palette.common.white,
      ...theme.typography["p2-medium"],
      svg: { marginRight: theme.spacing(2) },
    },
    "&.notistack-MuiContent": {
      color: theme.palette.text.primary,
      borderRadius: theme.spacing(1.5),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      boxSizing: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
    },
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.success.main,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.error.main,
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
