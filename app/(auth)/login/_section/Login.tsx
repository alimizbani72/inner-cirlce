import { Divider, Stack, Typography } from '@mui/material';
import { type FC, useMemo } from 'react';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { z } from 'zod';

import { setLoginInfo, setLoginStep } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/hooks';
import GoogleSignIn from './GoogleSignIn';

import { signIn } from '@/auth';
import LoadingButton from '@/components/loading-button';

const defaultValues = {
  email: '',
  password: '',
  otp: '', // Add OTP field to default values
};

const Login: FC = () => {
  const { t } = useTranslate();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();

  const twoFaCallback = (email: string, password: string) => {
    dispatch(
      setLoginInfo({
        email: email?.toLowerCase(),
        password: password,
      })
    );
    dispatch(setLoginStep(2));
  };

  const FormSchema = useMemo(
    () =>
      z.object({
        password: z.string().nonempty(t('formErrors.requiredPassword')),
        email: z
          .string()
          .nonempty(t('formErrors.requiredEmail'))
          .email({ message: t('formErrors.invalidEmail') }),
      }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn({
        password: data.password,
        email: data.email?.toLowerCase(),
        push,
        callback: () => twoFaCallback(data?.email, data?.password),
      });
    } catch {
      setError('email', { message: 'Email or password is wrong' });
    }
  });
  return (
    <Stack gap={4}>
      <Stack spacing={1}>
        <Typography variant="h3-semi-bold">{t('login.title')}</Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t('createAccount.subtitle')}
        </Typography>
      </Stack>
      <GoogleSignIn />
      <Divider>
        <Typography variant="p2-medium">{t('createAccount.orContinueWithEmail')}</Typography>
      </Divider>
      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
        <RHFTextField
          name="email"
          label={t('createAccount.emailLabel')}
          placeholder={t('createAccount.emailPlaceholder')}
        />
        <RHFTextField
          name="password"
          label={t('createAccount.passwordLabel')}
          placeholder={t('createAccount.passwordPlaceholder')}
          type="password"
        />
        <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
          <Typography
            variant="p2-medium"
            color={'pink.light'}
            sx={{ cursor: 'pointer' }}
            onClick={() => push('/forgotpass')}
          >
            {t('login.forgotPassword')}
          </Typography>
        </Stack>
        <LoadingButton color="primary" size="large" type="submit" loading={isSubmitting}>
          {t('login.loginButton')}
        </LoadingButton>
      </FormProvider>
      <Typography sx={{ textAlign: 'center' }} variant="p2-medium" color="grey.light">
        {t('login.noAccount')}{' '}
        <Typography
          component={'span'}
          variant="p2-medium"
          color="blue.light"
          sx={{ cursor: 'pointer' }}
          onClick={() => push('/register')}
        >
          {t('login.register')}
        </Typography>
      </Typography>
    </Stack>
  );
};
export default Login;
