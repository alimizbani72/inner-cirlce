import { Icon } from "@/components/icons";
import { Divider, Stack, Typography, Button } from "@mui/material";
import { useMemo, type FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { useTranslate } from "@/locales";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getRegisterInfo, setRegisterInfo, setRegisterStep } from "@/lib/features/auth/authSlice";
import { useVerifyServiceVerificationsSendCreateMutation } from "@/services/queries";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useAppRouter } from "@/routes/hooks";

const Register: FC = () => {
  const { t } = useTranslate();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { email, name, password } = useAppSelector(getRegisterInfo);
  const FormSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t("formErrors.requiredName")),
        password: Yup.string()
          .required(t("formErrors.requiredPassword"))
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, t("formErrors.passwordPattern")),
        email: Yup.string().email(t("formErrors.invalidEmail")).required(t("formErrors.requiredEmail")),
        terms: Yup.boolean().required(t("formErrors.requiredTerms")).oneOf([true], t("formErrors.requiredTerms")),
      }),
    []
  );
  const defaultValues = useMemo(
    () => ({
      name,
      password,
      email,
      terms: false,
    }),
    [email, name, password]
  );
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useVerifyServiceVerificationsSendCreateMutation();

  const onSubmit = handleSubmit((data) => {
    mutateAsync({ requestBody: { email: data.email } })
      .then(() => {
        dispatch(setRegisterInfo({ name: data.name, email: data.email, password: data.password }));
        dispatch(setRegisterStep(2));
      })
      .catch(() =>
        enqueueSnackbar(t("formErrors.formError"), {
          variant: "error",
        })
      );
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
        <RHFTextField name="invite" label={t("createAccount.inviteCodeLabel")} InputProps={{ readOnly: true }} />
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
        <LoadingButton color="primary" size="large" type="submit" loading={isPending}>
          {t("createAccount.createAccountButton")}
        </LoadingButton>
      </FormProvider>
      <Typography sx={{ textAlign: "center" }} variant="p2-medium" color="grey.light">
        {t("createAccount.alreadyHaveAccount")}{" "}
        <Typography
          component={"span"}
          variant="p2-medium"
          color="blue.light"
          sx={{ cursor: "pointer" }}
          onClick={() => push("/login")}
        >
          {t("createAccount.login")}
        </Typography>
      </Typography>
    </>
  );
};
export default Register;
