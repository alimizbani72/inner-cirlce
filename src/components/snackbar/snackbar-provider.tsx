"use client";

import Collapse from "@mui/material/Collapse";
import { SnackbarProvider as NotistackProvider } from "notistack";
import { type ReactNode, useRef } from "react";

import Iconify from "@/components/iconify";
import { CustomIcon, StyledIcon, StyledNotistack } from "./styles";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function SnackbarProvider({ children }: Props) {
  const notistackRef = useRef<any>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      TransitionComponent={Collapse}
      variant="success" // Set default variant
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      iconVariant={{
        info: (
          <StyledIcon color="info">
            <Iconify icon="eva:info-fill" width={24} />
          </StyledIcon>
        ),
        success: (
          <CustomIcon color="success">
            <Iconify icon="eva:checkmark-circle-2-fill" width={24} />
          </CustomIcon>
        ),
        warning: (
          <StyledIcon color="warning">
            <Iconify icon="eva:alert-triangle-fill" width={24} />
          </StyledIcon>
        ),
        error: (
          <CustomIcon color="error">
            <Iconify icon="clarity:error-line" width={24} />
          </CustomIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
      // with close as default
      // eslint-disable-next-line react/no-unstable-nested-components
      // action={(snackbarId) => (
      //   <IconButton
      //     size="small"
      //     onClick={() => closeSnackbar(snackbarId)}
      //     sx={{ p: 0.5 }}
      //   >
      //     <Iconify
      //       width={16}
      //       icon="mingcute:close-line"
      //     />
      //   </IconButton>
      // )}
    >
      {children}
    </NotistackProvider>
  );
}
