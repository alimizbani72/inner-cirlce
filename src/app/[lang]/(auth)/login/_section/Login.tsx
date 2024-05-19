import { Icon } from "@/components/icons";
import { Divider, Stack, Typography, Button } from "@mui/material";
import type { FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
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

const Login: FC = () => {
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
        <Typography variant="h3-semi-bold">{t("login.title")}</Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t("createAccount.subtitle")}
        </Typography>
      </Stack>
      <Button fullWidth color="info" startIcon={<Icon name="Google" />}>
        {t("login.loginWithGoogle")}
      </Button>
      <Divider>
        <Typography variant="p2-medium">{t("createAccount.orContinueWithEmail")}</Typography>
      </Divider>
      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
        <RHFTextField
          name="email"
          label={t("createAccount.emailLabel")}
          placeholder={t("createAccount.emailPlaceholder")}
        />
        <RHFTextField
          name="password"
          label={t("createAccount.passwordLabel")}
          placeholder={t("createAccount.passwordPlaceholder")}
          type="password"
        />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <RHFCheckbox label={<Typography variant="p2-regular">{t("login.rememberMe")}</Typography>} name="save" />
          <Typography variant="p2-medium" color={"pink.light"} sx={{ cursor: "pointer" }}>
            {t("login.forgotPassword")}
          </Typography>
        </Stack>
        <Button color="primary" size="large" type="submit">
          {t("login.loginButton")}
        </Button>
      </FormProvider>
      <Typography sx={{ textAlign: "center" }} variant="p2-medium" color="grey.light">
        {t("login.noAccount")}{" "}
        <Typography component={"span"} variant="p2-medium" color="blue.light">
          {t("login.register")}
        </Typography>
      </Typography>
    </>
  );
};
export default Login;
