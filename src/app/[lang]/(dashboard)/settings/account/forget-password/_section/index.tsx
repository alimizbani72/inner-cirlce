"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { Button } from "@mui/material";
import { useTranslate } from "@/locales";
import { RHFCode, RHFTextField } from "@/components/hook-form";
import { useTimer } from "react-timer-hook";
import { toNumber } from "lodash";
import {
  useAuthServiceAuthSendCodeCreateMutation,
  useAuthServiceAuthGuestTokenCreateMutation,
  useAuthServiceAuthResetPasswordCreateMutation,
} from "@minecraft/queries";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const getTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + toNumber(90));
  return time;
};

const ForgetPasswordDialog = () => {
  const open = useModalActivation("/forget-password/");

  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(1);
  const userInfo = useAppSelector(selectUser);
  const { minutes, seconds, totalSeconds, restart } = useTimer({ expiryTimestamp: getTimer() });
  const { mutateAsync: sendCode, isPending: sendCodeLoading } = useAuthServiceAuthSendCodeCreateMutation();
  const { mutateAsync: exchangeCode, data: exchangeData } = useAuthServiceAuthGuestTokenCreateMutation();

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useAuthServiceAuthResetPasswordCreateMutation();

  const { push, nativeBack } = useCustomRouter();

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        verifyCode: Yup.string().required(t("formErrors.requiredCode")),
        password: Yup.string()
          .required(t("formErrors.requiredPassword"))
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, t("formErrors.passwordPattern")),
        confirmPass: Yup.string().oneOf([Yup.ref("password")], t("formErrors.confirmPassword")),
      })
    ),
    defaultValues: { verifyCode: "", password: "", confirmPass: "" },
    mode: "onSubmit",
  });

  const { handleSubmit, watch, reset, setError } = methods;
  const submitExchangeCode = async () => {
    setLoading(true);
    try {
      await exchangeCode({ requestBody: { email: userInfo?.email, otp: watch("verifyCode") } });

      setFormState(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("verifyCode", { message: error?.message });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (formState === 2) {
      try {
        await resetPassword({
          token: exchangeData?.data,
          requestBody: {
            password: data.password,
          },
        });
        reset();
        enqueueSnackbar(t("forgetPassword.passwordChanged"));
        push("/setting/account");
      } catch (error) {
        enqueueSnackbar(error?.message || t("forgetPassword.failedToVerifyCode"), { variant: "error" });
      }
    }
  });

  const resendHandler = () => {
    sendCode({ requestBody: { email: userInfo?.email } })
      .then(() => {
        restart(getTimer());
      })
      .catch(() => setError("verifyCode", { message: t("formErrors.formError") }));
  };

  useEffect(() => {
    if (watch("verifyCode").length === 6) {
      submitExchangeCode();
    }
  }, [watch("verifyCode")]);

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="forgot-password"
      open={open}
      onClose={() => push("/settings/account")}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {formState === 1 ? t("forgetPassword.forgotPassword") : t("forgetPassword.createNewPassword")}
            </Typography>
          </Stack>

          <IconButton onClick={() => push("/settings/account")}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack>
          {formState === 1 ? (
            <>
              <Stack spacing={1} mb={4}>
                <Icon name="Mailbox--colorful" size={64} />
                <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
                  {t("emailVerification.title")}
                </Typography>
                <Typography variant="p2-regular" color="grey.light">
                  {t("emailVerification.subtitle")}{" "}
                  <Typography variant="p2-regular" component={"span"}>
                    {userInfo?.email}
                  </Typography>
                </Typography>
              </Stack>

              <FormProvider methods={methods}>
                <RHFCode
                  name="verifyCode"
                  label={t("emailVerification.verifyCodeLabel")}
                  loading={sendCodeLoading || loading}
                />
              </FormProvider>
              <Stack direction={"row"} spacing={2} alignItems={"center"} mt={5} mb={3}>
                <Button fullWidth color="info" onClick={nativeBack}>
                  {t("emailVerification.backButton")}
                </Button>
                {totalSeconds ? (
                  <Typography sx={{ width: "100%", textAlign: "center" }} color="grey.light" variant="p2-medium">
                    {`${t("emailVerification.resendWithTimer")} (${minutes.toString().padStart(2, "0")}:${seconds
                      .toString()
                      .padStart(2, "0")})`}
                  </Typography>
                ) : (
                  <Typography
                    sx={{ width: "100%", textAlign: "center", cursor: "pointer" }}
                    color="blue.light"
                    variant="p2-medium"
                    onClick={resendHandler}
                  >
                    {t("emailVerification.resend")}
                  </Typography>
                )}
              </Stack>
              <Typography variant="p2-regular" color="grey.light">
                {t("emailVerification.checkSpam")}
              </Typography>
            </>
          ) : (
            <Stack gap={5}>
              <Typography variant="h3-semi-bold">{t("forgetPassword.createNewPassword")}</Typography>
              <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
                <RHFTextField
                  name="password"
                  label={t("forgetPassword.newPassword")}
                  placeholder={t("forgetPassword.enterNewPassword")}
                  helperText={t("forgetPassword.passwordHelperText")}
                />
                <RHFTextField
                  name="confirmPass"
                  label={t("forgetPassword.confirmNewPassword")}
                  placeholder={t("forgetPassword.confirmNewPasswordPlaceholder")}
                  helperText={t("forgetPassword.confirmPasswordHelperText")}
                />
              </FormProvider>

              <LoadingButton loading={isResetPasswordPending} type="submit" onClick={onSubmit}>
                {t("forgetPassword.resetPassword")}
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ForgetPasswordDialog;
