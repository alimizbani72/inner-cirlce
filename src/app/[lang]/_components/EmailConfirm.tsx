import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCode } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { useTimer } from "react-timer-hook";
import { toNumber } from "@/utils/toNumber";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegisterStep,
  setForgotPasswordStep,
  getRegisterInfo,
  getForgotPasswordInfo,
  getRegisterStep,
  setForgotPasswordInfo,
} from "@/lib/features/auth/authSlice";
import { useAuthServiceAuthSendCodeCreateMutation } from "@minecraft/queries";
import { signIn } from "next-auth/react";
import { useAppRouter } from "@/routes/hooks";

const getTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + toNumber(90));
  return time;
};

const EmailConfirm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const { replace } = useAppRouter();
  const dispatch = useDispatch();
  const registerInfo = useSelector(getRegisterInfo);
  const forgotPasswordInfo = useSelector(getForgotPasswordInfo);
  const registerStep = useSelector(getRegisterStep);
  const email = registerStep === 2 ? registerInfo.email : forgotPasswordInfo.email;

  const { minutes, seconds, totalSeconds, restart } = useTimer({ expiryTimestamp: getTimer() });

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        verifyCode: Yup.string().required(t("formErrors.requiredCode")),
      })
    ),
    defaultValues: { verifyCode: "" },
    mode: "onSubmit",
  });

  const { handleSubmit, watch, setError } = methods;

  const { mutateAsync: sendCode, isPending: sendCodeLoading } = useAuthServiceAuthSendCodeCreateMutation();

  const resendHandler = () => {
    sendCode({ requestBody: { email } })
      .then(() => {
        restart(getTimer());
      })
      .catch(() => setError("verifyCode", { message: t("formErrors.formError") }));
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      if (registerStep === 2) {
        const signupRes = await signIn("custom-signup", {
          full_name: registerInfo.name,
          password: registerInfo.password,
          email,
          policy_approved: true,
          otp: data.verifyCode,
          redirect: false,
        });
        setLoading(false);
        if (signupRes?.ok) {
          replace("/dashboard");
        } else {
          setError("verifyCode", { message: "There was an error processing your request. Please try again." });
          // JSON.parse(signupRes?.error || "")?.errors.message
        }
      } else {
        dispatch(setForgotPasswordInfo({ email, otp: data.verifyCode }));
        dispatch(setForgotPasswordStep(3));
      }
    } catch (error) {
      setLoading(false);
      setError("verifyCode", { message: error?.message });
    }
  });

  useEffect(() => {
    if (watch("verifyCode").length === 6) {
      onSubmit();
    }
  }, [watch("verifyCode")]);

  const handleBack = () => {
    if (registerStep === 2) {
      dispatch(setRegisterStep(1));
    } else {
      dispatch(setForgotPasswordStep(1));
    }
  };

  return (
    <>
      <Stack spacing={1}>
        <Icon name="Mailbox--colorful" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t("emailVerification.title")}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t("emailVerification.subtitle")}{" "}
          <Typography variant="p2-regular" component={"span"}>
            {email}
          </Typography>
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFCode
          name="verifyCode"
          label={t("emailVerification.verifyCodeLabel")}
          loading={sendCodeLoading || loading}
        />
      </FormProvider>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Button fullWidth color="info" onClick={handleBack}>
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
  );
};

export default EmailConfirm;
