"use client";

import CustomDialog from "@/components/CustomDialog";
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
  useAccountServiceAuthResetPasswordCreateMutation,
  useAccountServiceAuthUserinfoQuery,
  useVerifyServiceVerificationsExchangeCreateMutation,
  useVerifyServiceVerificationsSendCreateMutation,
} from "@/services/queries";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

const getTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + toNumber(90));
  return time;
};

const ForgetPasswordDialog = () => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(1);
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const { minutes, seconds, totalSeconds, restart } = useTimer({ expiryTimestamp: getTimer() });
  const { mutateAsync: sendCode, isPending: sendCodeLoading } = useVerifyServiceVerificationsSendCreateMutation();
  const { mutateAsync: exchangeCode, data: exchangeData } = useVerifyServiceVerificationsExchangeCreateMutation();
  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useAccountServiceAuthResetPasswordCreateMutation();

  const { push, back, nativeBack } = useCustomRouter();

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
      await exchangeCode({ requestBody: { code: watch("verifyCode") } });

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
          requestBody: {
            email: (userInfo as any)?.data?.email,
            password: data.password,
            session_code: exchangeData?.data?.session_code,
          },
        });
        reset();
        enqueueSnackbar("Password changed successfully!");
        push("/profile");
      } catch (error) {
        enqueueSnackbar(error?.message || "Failed to verify code!", { variant: "error" });
      }
    }
  });

  const resendHandler = () => {
    sendCode({ requestBody: { email: (userInfo as any)?.data?.email } })
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
    <CustomDialog fullWidth maxWidth="sm" onClose={back} aria-labelledby="change-password-dialog" open>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {formState === 1 ? "Forgot Password" : "Create New Password"}
            </Typography>
          </Stack>

          <IconButton onClick={back}>
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
                    {(userInfo as any)?.data?.email}
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
              <Typography variant="h3-semi-bold">Create New Password</Typography>
              <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
                <RHFTextField
                  name="password"
                  label="New Password"
                  placeholder="Enter your new password"
                  helperText="Use 8 or more characters with a mix of letters, numbers, and symbols."
                />
                <RHFTextField
                  name="confirmPass"
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  helperText="Both password must match."
                />
              </FormProvider>

              <LoadingButton loading={isResetPasswordPending} type="submit" onClick={onSubmit}>
                Reset Password
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ForgetPasswordDialog;
