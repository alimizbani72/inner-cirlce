import { Stack, Typography, Button } from "@mui/material";
import type { FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test("invalid character", "Your name can't contain numbers", (val) => !/\d/.test(val)),
  checkbox: Yup.boolean(),
});

const defaultValues = {
  name: "",
  checkbox: false,
};

const ResetPass: FC = () => {
  const { t } = useTranslate();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", data);
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
        <Button color="primary" size="large" type="submit">
          {t("resetPassword.resetPasswordButton")}
        </Button>
      </FormProvider>
    </>
  );
};
export default ResetPass;
