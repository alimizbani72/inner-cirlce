"use client";

import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthServiceAuthChangePassword, useAuthServiceAuthSendCodeCreateMutation } from "@minecraft/queries";
import { enqueueSnackbar } from "notistack";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePasswordDialog = () => {
  const open = useModalActivation("/change-password/");
  const { push, nativeBack } = useCustomRouter();
  const userInfo = useAppSelector(selectUser);
  const { t } = useTranslate();

  const { mutateAsync, isPending } = useAuthServiceAuthChangePassword();
  const { mutateAsync: sendVerification, isPending: isForgetPassPending } = useAuthServiceAuthSendCodeCreateMutation();

  const UpdateUserSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required(t("formErrors.requiredNewPassword"))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, t("formErrors.newPasswordPattern")),
    confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword")], t("formErrors.confirmPassword")),
    currentPassword: Yup.string().required(t("formErrors.requiredCurrentPassword")),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ requestBody: { old_password: data.currentPassword, new_password: data.newPassword } });
      reset();
      enqueueSnackbar(t("changePassword.passwordChangedSuccess"));
      push("/settings/account");
    } catch (error) {
      enqueueSnackbar(error?.body?.message || t("changePassword.passwordChangedFailed"), { variant: "error" });
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="change-password" open={open} onClose={nativeBack}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <IconButton onClick={nativeBack}>
              <Icon name="Arrow-left" />
            </IconButton>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {t("changePassword.title")}
            </Typography>
          </Stack>

          <IconButton onClick={nativeBack}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <RHFTextField
              name="currentPassword"
              label={t("changePassword.currentPassword")}
              placeholder={t("changePassword.enterCurrentPassword")}
            />
            <Typography
              mt="-16px"
              variant="p2-medium"
              textAlign={"right"}
              onClick={async () => {
                await sendVerification({ requestBody: { email: userInfo?.email } }).then(() => {
                  push("/settings/forget-password");
                });
              }}
              sx={{
                background: (theme) => (isForgetPassPending ? theme.palette.grey.light : theme.palette.gradient.pink),
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                cursor: "pointer",
              }}
            >
              {t("changePassword.forgotPassword")}
            </Typography>

            <RHFTextField
              name="newPassword"
              label={t("changePassword.newPassword")}
              placeholder={t("changePassword.enterNewPassword")}
              helperText={t("changePassword.passwordHelperText")}
            />
            <RHFTextField
              name="confirmNewPassword"
              label={t("changePassword.confirmNewPassword")}
              placeholder={t("changePassword.confirmNewPasswordPlaceholder")}
              helperText={t("changePassword.confirmPasswordHelperText")}
            />
          </FormProvider>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            {t("button.cancel")}
          </Button>
          <LoadingButton color="primary" onClick={onSubmit} loading={isPending}>
            {t("changePassword.saveChange")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default ChangePasswordDialog;
