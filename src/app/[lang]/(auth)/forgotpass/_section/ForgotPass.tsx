import { Stack, Typography, Button } from "@mui/material";
import { useMemo, type FC } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";
import { useAppRouter } from "@/routes/hooks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getForgotPasswordInfo, setForgotPasswordInfo, setForgotPasswordStep } from "@/lib/features/auth/authSlice";
import {
  useVerifyServiceVerificationsEmailCheckCreateMutation,
  useVerifyServiceVerificationsSendCreateMutation,
} from "@minecraft/queries";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

const ForgotPass: FC = () => {
  const { t } = useTranslate();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { email } = useAppSelector(getForgotPasswordInfo);
  const FormSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email(t("formErrors.invalidEmail")).required(t("formErrors.requiredEmail")),
      }),
    []
  );
  const defaultValues = useMemo(
    () => ({
      email,
      terms: false,
    }),
    [email]
  );
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, setError } = methods;

  const { mutateAsync: checkEmail, isPending: checkEmailLoading } =
    useVerifyServiceVerificationsEmailCheckCreateMutation();
  const { mutateAsync, isPending } = useVerifyServiceVerificationsSendCreateMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const checkEmailResult = await checkEmail({ requestBody: { email: data.email } });
      if (checkEmailResult.data) {
        await mutateAsync({ requestBody: { email: data.email } });
        dispatch(setForgotPasswordInfo({ email: data.email }));
        dispatch(setForgotPasswordStep(2));
      } else {
        setError("email", { message: t("formErrors.userNotFound") });
      }
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
          <Button fullWidth color="info" size="large" type="submit" onClick={() => push("/login")}>
            {t("passwordRecovery.backButton")}
          </Button>
          <LoadingButton loading={isPending || checkEmailLoading} fullWidth color="primary" size="large" type="submit">
            {t("passwordRecovery.continueButton")}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
};
export default ForgotPass;
