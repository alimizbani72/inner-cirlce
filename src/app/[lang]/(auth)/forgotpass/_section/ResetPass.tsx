import { Stack, Typography } from "@mui/material";
import { useMemo, useState, type FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { getForgotPasswordInfo } from "@/lib/features/auth/authSlice";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { signIn } from "next-auth/react";
import { useAuthServiceAuthResetPasswordCreateMutation } from "@minecraft/queries";

const defaultValues = {
  password: "",
  confirmPass: "",
};

const ResetPass: FC = () => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { email, token } = useAppSelector(getForgotPasswordInfo);
  const { mutateAsync: resetPasshandler } = useAuthServiceAuthResetPasswordCreateMutation();
  const FormSchema = useMemo(
    () =>
      Yup.object().shape({
        password: Yup.string()
          .required(t("formErrors.requiredPassword"))
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, t("formErrors.passwordPattern")),
        confirmPass: Yup.string().oneOf([Yup.ref("password")], t("formErrors.confirmPassword")),
      }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await resetPasshandler(
        {
          token,
          requestBody: { password: data.password },
        },
        {
          onSuccess() {
            signIn("custom-login", {
              password: data.password,
              email,
              redirect: false,
            }).then((res) => {
              if (res?.ok) {
                window.location.href = "/dashboard";
              } else {
                enqueueSnackbar(t("formErrors.formError"), {
                  variant: "error",
                });
              }
            });
            setLoading(false);
          },
        }
      );
    } catch (_error) {
      setLoading(false);
      enqueueSnackbar(t("formErrors.formError"), {
        variant: "error",
      });
    }
  });

  return (
    <>
      <Stack spacing={1}>
        <Icon name="Password--colorful" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t("resetPassword.title")}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t("resetPassword.subtitle")}
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 5 }}>
        <RHFTextField
          name="password"
          label={t("resetPassword.newPasswordLabel")}
          placeholder={t("resetPassword.newPasswordPlaceholder")}
          type="password"
        />
        <RHFTextField
          name="confirmPass"
          label={t("resetPassword.confirmNewPasswordLabel")}
          placeholder={t("resetPassword.confirmNewPasswordPlaceholder")}
          type="password"
        />
        <LoadingButton loading={loading} color="primary" size="large" type="submit">
          {t("resetPassword.resetPasswordButton")}
        </LoadingButton>
      </FormProvider>
    </>
  );
};
export default ResetPass;
