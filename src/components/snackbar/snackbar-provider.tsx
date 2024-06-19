"use client";

import Collapse from "@mui/material/Collapse";
import { SnackbarProvider as NotistackProvider } from "notistack";
import { type ReactNode, useRef } from "react";
import { StyledNotistack } from "./styles";
import { Icon } from "../icons";

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
        success: <Icon name="Eye-On" />,
        error: <Icon name="Eye-On" />,
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
