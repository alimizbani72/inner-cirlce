"use client";
import type { DialogProps } from "@mui/material";
import { Dialog } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

const CustomDialog: FC<PropsWithChildren<DialogProps>> = ({ children, ...props }) => {
  return (
    <Dialog
      sx={(theme) => ({
        "& .MuiDialogTitle-root": {
          padding: theme.spacing(3),
        },
        "& .MuiPaper-root": {
          boxShadow: "none",
          bgcolor: theme.palette.dark[1],
        },
      })}
      aria-labelledby="customized-dialog-title"
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
