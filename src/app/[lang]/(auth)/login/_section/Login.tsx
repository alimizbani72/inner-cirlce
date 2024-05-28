import { Icon } from "@/components/icons";
import { Divider, Stack, Typography, Button } from "@mui/material";
import { useMemo, useState, type FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";

const defaultValues = {
  email: "",
  password: "",
};

const Login: FC = () => {
  const { t } = useTranslate();
  const { push } = useAppRouter();
  const [loading, setLoading] = useState(false);
  const FormSchema = useMemo(
    () =>
      Yup.object().shape({
        password: Yup.string().required(t("formErrors.requiredPassword")),
        email: Yup.string().email(t("formErrors.invalidEmail")).required(t("formErrors.requiredEmail")),
      }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await signIn("custom-login", { password: data.password, email: data.email, redirect: false });
    if (res?.ok) {
      push("/dashboard");
      setLoading(false);
    } else {
      setLoading(false);
      setError("email", { message: "Email or password is wrong" });
    }
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
          <Typography
            variant="p2-medium"
            color={"pink.light"}
            sx={{ cursor: "pointer" }}
            onClick={() => push("/forgotpass")}
          >
            {t("login.forgotPassword")}
          </Typography>
        </Stack>
        <LoadingButton color="primary" size="large" type="submit" loading={loading}>
          {t("login.loginButton")}
        </LoadingButton>
      </FormProvider>
      <Typography sx={{ textAlign: "center" }} variant="p2-medium" color="grey.light">
        {t("login.noAccount")}{" "}
        <Typography
          component={"span"}
          variant="p2-medium"
          color="blue.light"
          sx={{ cursor: "pointer" }}
          onClick={() => push("/register")}
        >
          {t("login.register")}
        </Typography>
      </Typography>
    </>
  );
};
export default Login;
