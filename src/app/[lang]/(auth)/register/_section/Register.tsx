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

const Register: FC = () => {
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
        <Typography variant="h3-semi-bold">{t("createAccount.title")}</Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t("createAccount.subtitle")}
        </Typography>
      </Stack>
      <Button fullWidth color="info" startIcon={<Icon name="Google" />}>
        {t("createAccount.registerWithGoogle")}
      </Button>
      <Divider>
        <Typography variant="p2-medium">{t("createAccount.orContinueWithEmail")}</Typography>
      </Divider>
      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
        <RHFTextField
          name="name"
          label={t("createAccount.fullNameLabel")}
          placeholder={t("createAccount.fullNamePlaceholder")}
        />
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
        <RHFTextField
          name="invite"
          label={t("createAccount.inviteCodeLabel")}
          placeholder={t("createAccount.inviteCodePlaceholder")}
        />
        <RHFCheckbox
          label={
            <Typography variant="p2-regular" color="grey.light">
              {t("createAccount.agreeToTerms")}{" "}
              <Typography variant="p2-regular" component={"span"}>
                {t("createAccount.termsAndConditions")}
              </Typography>
            </Typography>
          }
          name="terms"
        />
        <Button color="primary" size="large" type="submit">
          {t("createAccount.createAccountButton")}
        </Button>
      </FormProvider>
      <Typography sx={{ textAlign: "center" }} variant="p2-medium" color="grey.light">
        {t("createAccount.alreadyHaveAccount")}{" "}
        <Typography component={"span"} variant="p2-medium" color="blue.light">
          {t("createAccount.login")}
        </Typography>
      </Typography>
    </>
  );
};
export default Register;
