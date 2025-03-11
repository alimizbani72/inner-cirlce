'use client';
import { RHFCheckbox, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import Link from '@/components/link';
import LoadingButton from '@/components/loading-button';
import { useDebounce } from '@/hooks/use-debounce';
import { getRegisterInfo, setRegisterInfo, setRegisterStep } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { usePostAuthEmailExists, usePostAuthSendCode } from '@/services/minecraft/auth/auth';
import windowAvailable from '@/utils/windowAvailable';
import GoogleSignIn from '@auth/login/_section/GoogleSignIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { type FC, useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const Register: FC = () => {
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();

  const { email, name, password } = useAppSelector(getRegisterInfo);
  const referralCode = searchParams.get('sponsor') || '';

  if (referralCode && windowAvailable) {
    Cookies.set('referral_code', referralCode, { expires: 1 });
  }
  const FormSchema = useMemo(
    () =>
      z.object({
        name: z.string().nonempty(t('formErrors.requiredName')),
        password: z
          .string()
          .nonempty(t('formErrors.requiredPassword'))
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            t('formErrors.passwordPattern')
          ),
        email: z
          .string()
          .nonempty(t('formErrors.requiredEmail'))
          .email({ message: t('formErrors.invalidEmail') })
          .regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, t('formErrors.invalidEmail')),
        terms: z.boolean().refine((val) => val, { message: t('formErrors.requiredTerms') }),
        invite: z.string().optional(),
      }),
    [t]
  );

  const defaultValues = useMemo(
    () => ({
      name,
      password,
      email,
      terms: false,
      invite: '',
    }),
    [email, name, password]
  );

  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, control, watch, setError, clearErrors, trigger, formState, setValue } =
    methods;

  useEffect(() => {
    setValue('invite', searchParams.get('sponsor') || Cookies.get('referral_code') || '');
  }, []);

  const { isValid } = formState;

  const { mutateAsync: checkEmailMutate } = usePostAuthEmailExists();
  const { mutateAsync, isPending } = usePostAuthSendCode();
  const debounceEmail = useDebounce(watch('email'), 500);

  const onSubmit = handleSubmit((data) => {
    mutateAsync({ data: { email: data.email } })
      .then(() => {
        dispatch(
          setRegisterInfo({
            name: data.name,
            email: data.email?.toLowerCase(),
            password: data.password,
          })
        );
        dispatch(setRegisterStep(2));
      })
      .catch(() => toast.error(t('formErrors.formError')));
  });

  const checkEmail = useCallback(
    async (email: string) => {
      try {
        const response = await checkEmailMutate({ data: { email } });
        if (response.data) {
          setError('email', {
            type: 'manual',
            message: t('formErrors.emailExists'),
          });
        } else {
          clearErrors('email');
        }
      } catch (_error) {
        setError('email', {
          type: 'manual',
          message: t('formErrors.formError'),
        });
      }
    },
    [checkEmailMutate, setError, clearErrors, t]
  );

  useEffect(() => {
    if (debounceEmail) {
      trigger('email').then((isValid) => {
        if (isValid) {
          checkEmail(debounceEmail);
        }
      });
    }
  }, [debounceEmail, trigger]);

  return (
    <Stack gap={4}>
      <Stack spacing={1}>
        <Typography variant="h3-semi-bold">{t('createAccount.title')}</Typography>
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
          name="name"
          label={t('createAccount.fullNameLabel')}
          placeholder={t('createAccount.fullNamePlaceholder')}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <RHFTextField
              {...field}
              label={t('createAccount.emailLabel')}
              placeholder={t('createAccount.emailPlaceholder')}
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )}
        />
        <RHFTextField
          name="password"
          label={t('createAccount.passwordLabel')}
          placeholder={t('createAccount.passwordPlaceholder')}
          type="password"
        />
        <RHFTextField
          name="invite"
          label={t('createAccount.inviteCodeLabel')}
          slotProps={{ input: { readOnly: true } }}
        />
        <RHFCheckbox
          sx={{
            '&.MuiFormControlLabel-root': {
              alignItems: 'flex-start',
            },
          }}
          label={
            <Typography variant="p2-regular" color="grey.light">
              {t('createAccount.firstPart')}
              {'  '}
              <Typography variant="caption-regular" component={Link} href="/terms-and-condition">
                {t('register.termsAndConditions')}
                {'  '}
              </Typography>
              {t('createAccount.and')}
              {'  '}
              <Typography variant="caption-regular" component={Link} href="/disclaimer">
                {t('register.disclaimer')}
                {'  '}
              </Typography>
              {t('createAccount.lastPart')}
              {'  '}
              <Typography variant="caption-regular" component={'span'}>
                {t('register.refundWaiver')}
              </Typography>
            </Typography>
          }
          name="terms"
        />
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          loading={isPending}
          disabled={!isValid}
        >
          {t('createAccount.createAccountButton')}
        </LoadingButton>
      </FormProvider>
      <Typography sx={{ textAlign: 'center' }} variant="p2-medium" color="grey.light">
        {t('createAccount.alreadyHaveAccount')}{' '}
        <Typography
          component={'span'}
          variant="p2-medium"
          color="blue.light"
          sx={{ cursor: 'pointer' }}
          onClick={() => push('/login')}
        >
          {t('createAccount.login')}
        </Typography>
      </Typography>
    </Stack>
  );
};

export default Register;
