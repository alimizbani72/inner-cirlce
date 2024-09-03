"use client";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { useTranslate } from "@/locales";
import { signOut } from "next-auth/react";
import { Icon } from "@/components/icons";
import { LoadingButton } from "@mui/lab";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const LogoutDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setLoading(true);
    signOut({ redirect: true, callbackUrl: "/login" }).finally(() => setLoading(false));
  };

  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="logout-dialog" open={open}>
      <DialogContent sx={{ p: 3 }}>
        <Stack alignItems="center">
          <Icon name="LogOut" size={64} />
          <Typography mt={2} mb={1} variant="h3-semi-bold">
            {t("profileDialog.logout")}
          </Typography>
          <Typography textAlign="center" variant="p2-regular" color="grey.light">
            Are you sure you want to logout from your ChainMind account?
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={"row"} gap={2}>
          <Button fullWidth color="info" onClick={close}>
            No, Cancel
          </Button>
          <LoadingButton loading={loading} fullWidth onClick={handleLogout}>
            Yes, Logout
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default LogoutDialog;
