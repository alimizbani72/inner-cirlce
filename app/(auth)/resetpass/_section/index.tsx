'use client';
import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';

import z from 'zod';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';

import { useSearchParams } from 'next/navigation';
import { usePostAuthGuestToken, usePostAuthResetPassword } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';

const defaultValues = {
  password: '',
  confirmPass: '',
};

const ResetPassSection: FC = () => {
  const { t } = useTranslate();
  const { replace } = useAppRouter();
  const searchParams = useSearchParams();

  const { mutateAsync: getSession, data: guestToken } = usePostAuthGuestToken();
  const { mutateAsync: resetPassHandler, isPending } = usePostAuthResetPassword();

  const getSessionHandler = useCallback(async () => {
    if (searchParams.get('otp')) {
      try {
        await getSession({
          data: { otp: searchParams.get('otp')!, email: searchParams.get('email')! },
        });
      } catch (_error) {
        replace('/login');
      }
    }
  }, []);

  useEffect(() => {
    getSessionHandler();
  }, []);

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

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassHandler({
        params: { _token: guestToken?.data || '' },
        data: { password: data.password },
      });
      replace('/login');
      toast.success(t('resetPassword.successChange'));
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
        <LoadingButton loading={isPending} color="primary" size="large" type="submit">
          {t('resetPassword.resetPasswordButton')}
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
};
export default ResetPassSection;
