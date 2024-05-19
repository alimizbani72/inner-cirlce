import { Stack, Typography, Button } from "@mui/material";
import type { FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";

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

const ForgotPass: FC = () => {
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
          {t("passwordRecovery.title")}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t("passwordRecovery.subtitle")}
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 5 }}>
        <RHFTextField
          name="email"
          label={t("passwordRecovery.emailLabel")}
          placeholder={t("passwordRecovery.emailPlaceholder")}
        />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
          <Button fullWidth color="info" size="large" type="submit">
            {t("passwordRecovery.backButton")}
          </Button>
          <Button fullWidth color="primary" size="large" type="submit">
            {t("passwordRecovery.continueButton")}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};
export default ForgotPass;
