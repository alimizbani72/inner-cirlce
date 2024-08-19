import { Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCode } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";
import { useSelector } from "react-redux";
import { getLoginInfo } from "@/lib/features/auth/authSlice";
import { signIn } from "next-auth/react";
import { LoadingButton } from "@mui/lab";

const TwoFAConfirm: FC = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslate();
  const loginInfo = useSelector(getLoginInfo);

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        otp: Yup.string().when("requires2FA", {
          is: true,
          then: (schema) => schema.required("Please enter your OTP"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
    defaultValues: { otp: "" },
    mode: "onSubmit",
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await signIn("custom-login", { ...loginInfo, otp: data.otp });

    if (res?.ok) {
      window.location.href = "/dashboard";
    } else {
      setError("otp", { message: "The value is wrong, try again." });
    }
    setLoading(false);
  });

  return (
    <>
      <Stack spacing={1}>
        <Icon name="Mailbox--colorful" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          Two-factor authentication
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          Enter the six digit code from your authentication app
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFCode name="otp" label="code" />
      </FormProvider>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <LoadingButton fullWidth onClick={onSubmit} loading={loading}>
          {t("button.verify")}
        </LoadingButton>
      </Stack>
    </>
  );
};

export default TwoFAConfirm;
