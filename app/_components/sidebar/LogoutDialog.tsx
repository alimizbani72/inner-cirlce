"use client";
import { signOut } from "@/auth";
import CustomDialog from "@/components/CustomDialog";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { Button, DialogActions, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { type FC, useState } from "react";
import { toast } from "sonner";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const LogoutDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useAppRouter();
  const isMobile = useIsMobile();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();

      router?.replace("/login");
      setLoading(false);
    } catch {
      toast.error(t("formErrors.formError"));
    }
  };

  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={close}
      aria-labelledby="logout-dialog"
      open={open}
    >
      <DialogContent sx={{ p: 3 }}>
        <Stack alignItems="center">
          <Icon name="LogoutIcon" size={64} stroke="error.main" />
          <Typography mt={2} mb={1} variant="h3-semi-bold">
            {t("profileDialog.logout")}
          </Typography>
          <Typography
            textAlign="center"
            variant="p2-regular"
            color="grey.light"
          >
            {t("profileDialog.descriptyion")}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={"row"} gap={2}>
          <Button
            fullWidth
            color="tertiary"
            onClick={close}
            sx={{ ...(isMobile && { typography: "caption-regular" }) }}
          >
            {t("profileDialog.noBtn")}
          </Button>
          <LoadingButton
            loading={loading}
            fullWidth
            onClick={handleLogout}
            sx={{ ...(isMobile && { typography: "caption-regular" }) }}
          >
            {t("profileDialog.yesBtn")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default LogoutDialog;
