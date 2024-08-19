"use client";

import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";

type Props = {
  close: VoidFunction;
  onSubmit: VoidFunction;
  open: boolean;
};

const TwoFAAlertDialog: FC<Props> = ({ close, open, onSubmit }) => {
  const { t } = useTranslate();

  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="two-fa-alert-dialog" open={open}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack alignItems="center">
          <Icon name="Password--colorful" size={64} />
          <Typography mt={2} variant="h3-semi-bold">
            Please Enable Your 2FA
          </Typography>
          <Typography mt={1} variant="p2-regular" color="grey.light" textAlign="center">
            Add an extra layer of protection by enabling Two-Factor Authentication (2FA).
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"} gap={2}>
          <Button size="large" fullWidth color="info" onClick={close}>
            {t("button.later")}
          </Button>
          <Button size="large" fullWidth onClick={onSubmit}>
            {t("button.enable")}
          </Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TwoFAAlertDialog;
