"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useKycServiceKycVerificationCreateMutation } from "@minecraft/queries";
import { LoadingButton } from "@mui/lab";
import CustomizedSteppers from "@/components/CustomizedSteppers";
import { kycCallback } from "@/consts";
import { usePathname } from "next/navigation";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const KYCInfoDialog = () => {
  const userInfo = useAppSelector(selectUser);
  const { mutateAsync, isPending } = useKycServiceKycVerificationCreateMutation();

  const pathname = usePathname();
  const open = useModalActivation("/kyc-info/");

  const { push, nativeBack } = useCustomRouter();
  const { t } = useTranslate();

  const onSubmit = async () => {
    try {
      const res = await mutateAsync({ requestBody: { redirect_url: kycCallback(pathname) } });
      if (res.data?.verification_url) {
        window.location.href = res.data?.verification_url;
      }
    } catch (_error) {
      // console.log(_error);
    }
  };
  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="kyc-info"
      open={open}
      onClose={() => push("/settings/become-partner/")}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {t("kycInfoDialog.title")}
            </Typography>
          </Stack>

          <IconButton onClick={() => push("/settings/become-partner/")}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3}>
          <CustomizedSteppers activeStep={0} />

          <Divider flexItem />
          <Stack gap={1} justifyContent={"center"} alignItems={"center"} sx={{ textAlign: "center" }}>
            <Icon name="KYC" size={64} />
            <Typography variant="p2-regular">{t("kycInfoDialog.description")}</Typography>
            <LoadingButton color="primary" onClick={onSubmit} sx={{ mt: 2 }} loading={isPending}>
              {t("kycInfoDialog.doKycNow")}
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            {t("kycInfoDialog.backButton")}
          </Button>
          <Button
            color="primary"
            onClick={() => push("/settings/become-partner/success")}
            disabled={!userInfo?.kyc_status}
          >
            {t("kycInfoDialog.nextStepButton")}
          </Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default KYCInfoDialog;
