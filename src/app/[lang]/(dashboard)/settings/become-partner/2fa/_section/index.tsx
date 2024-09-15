"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import CustomizedSteppers from "@/components/CustomizedSteppers";
import QRCodeWithIcon from "@/components/QRCodeWithIcon";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import * as Yup from "yup";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";

const TwoFactorDialog = () => {
  const open = useModalActivation("/2fa/");
  const { push, nativeBack } = useCustomRouter();
  const { t } = useTranslate();

  const FormSchema = useMemo(
    () =>
      Yup.object().shape({
        authcode: Yup.string(),
      }),
    []
  );
  const defaultValues = useMemo(
    () => ({
      authcode: "",
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = () => push("/settings/become-partner/success");

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="2fa"
      open={open}
      onClose={() => push("/settings/become-partner/")}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {t("twoFactorDialog.title")}
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
          <CustomizedSteppers activeStep={2} />

          <Divider flexItem />
          <Stack gap={3} justifyContent={"center"}>
            <Stack gap={2}>
              <Typography variant="p2-regular">{t("twoFactorDialog.securityMessage")}</Typography>
              <Typography variant="p2-regular">{t("twoFactorDialog.qrInstruction")}</Typography>
            </Stack>
            <Stack alignItems={"center"} sx={{ width: "100%" }}>
              <QRCodeWithIcon value={"https://google.com"} iconSrc="/logo/logo.svg" size={123} />
            </Stack>
            <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 5, alignItems: "flex-start" }}>
              <RHFTextField
                name="authcode"
                label={t("twoFactorDialog.authCodeLabel")}
                placeholder={t("twoFactorDialog.authCodePlaceholder")}
              />
            </FormProvider>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            {t("twoFactorDialog.backButton")}
          </Button>
          <LoadingButton color="primary" onClick={onSubmit}>
            {t("twoFactorDialog.nextStepButton")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TwoFactorDialog;
