"use client";
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import {
  useAccountServiceAuthResetPasswordCreateMutation,
  useVerifyServiceVerificationsExchangeCreateMutation,
} from "@minecraft/queries";
import { useSearchParams } from "next/navigation";

const defaultValues = {
  password: "",
  confirmPass: "",
};

const ResetPassSection: FC = () => {
  const { t } = useTranslate();
  const { replace } = useAppRouter();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();

  const [sessionCode, setSessionCode] = useState("");

  const { mutateAsync: getSession } = useVerifyServiceVerificationsExchangeCreateMutation();
  const { mutateAsync: resetPasshandler, isPending } = useAccountServiceAuthResetPasswordCreateMutation();

  const getSessionHandler = useCallback(async () => {
    if (searchParams.get("otp")) {
      try {
        await getSession(
          { requestBody: { code: searchParams.get("otp")! } },
          {
            onSuccess(data) {
              setSessionCode(data.data?.session_code!);
            },
          }
        );
      } catch (_error) {
        replace("/login");
      }
    }
  }, []);

  useEffect(() => {
    getSessionHandler();
  }, []);

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
    try {
      await resetPasshandler({
        requestBody: { email: searchParams.get("email")!, password: data.password, session_code: sessionCode },
      });

      replace("/login");

      enqueueSnackbar("Your password successfully changed", {
        variant: "success",
      });
    } catch (_error) {
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
        <LoadingButton loading={isPending} color="primary" size="large" type="submit">
          {t("resetPassword.resetPasswordButton")}
        </LoadingButton>
      </FormProvider>
    </>
  );
};
export default ResetPassSection;
