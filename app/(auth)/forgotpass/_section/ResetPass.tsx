import { Stack, Typography } from '@mui/material';
import { type FC, useMemo } from 'react';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  getForgotPasswordInfo,
  setForgotPasswordInfo,
  setForgotPasswordStep,
} from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import z from 'zod';

import { signIn } from '@/auth';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';
import { usePostAuthResetPassword } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import { useAppRouter } from '@/routes/hooks';

const defaultValues = {
  password: '',
  confirmPass: '',
};

const ResetPass: FC = () => {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const { push } = useAppRouter();
  const { email, token } = useAppSelector(getForgotPasswordInfo);

  const twoFaCallback = (password: string) => {
    dispatch(
      setForgotPasswordInfo({
        email: email?.toLowerCase(),
        password,
      })
    );
    dispatch(setForgotPasswordStep(4));
  };

  const { mutateAsync: resetPassHandler } = usePostAuthResetPassword();
  const FormSchema = useMemo(
    () =>
      z
        .object({
          password: z
            .string()
            .nonempty(t('formErrors.requiredPassword'))
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              t('formErrors.passwordPattern')
            ),
          confirmPass: z.string(),
        })
        .refine((data) => data.password === data.confirmPass, {
          message: t('formErrors.confirmPassword'),
          path: ['confirmPass'],
        }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassHandler(
        {
          params: { _token: token! },
          data: { password: data.password },
        },
        {
          onSuccess() {
            try {
              signIn({
                password: data.password,
                email,
                push,
                callback: () => twoFaCallback(data?.password),
              });
            } catch {
              toast.error(t('formErrors.formError'));
            }
          },
        }
      );
    } catch (_error) {
      toast.error(t('formErrors.formError'));
    }
  });

  return (
    <Stack gap={4}>
      <Stack spacing={1}>
        <Icon name="PasswordIcon" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t('resetPassword.title')}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t('resetPassword.subtitle')}
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 5 }}>
        <RHFTextField
          name="password"
          label={t('resetPassword.newPasswordLabel')}
          placeholder={t('resetPassword.newPasswordPlaceholder')}
          type="password"
        />
        <RHFTextField
          name="confirmPass"
          label={t('resetPassword.confirmNewPasswordLabel')}
          placeholder={t('resetPassword.confirmNewPasswordPlaceholder')}
          type="password"
        />
        <LoadingButton loading={isSubmitting} color="primary" size="large" type="submit">
          {t('resetPassword.resetPasswordButton')}
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
};
export default ResetPass;
