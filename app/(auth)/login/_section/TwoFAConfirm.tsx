import { RHFCode } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { useTranslate } from '@/locales';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { signIn } from '@/auth';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';
import { getForgotPasswordInfo, getLoginInfo } from '@/lib/features/auth/authSlice';
import { useAppRouter } from '@/routes/hooks';
import { useSelector } from 'react-redux';

const TwoFAConfirm: FC = () => {
  const { push } = useAppRouter();
  const { t } = useTranslate();
  const loginInfo = useSelector(getLoginInfo);
  const forgetPassInfo = useSelector(getForgotPasswordInfo);

  const methods = useForm({
    resolver: zodResolver(
      z.object({
        otp: z.string().refine((data) => data.length === 6, {
          message: 'Please enter your OTP',
        }),
      })
    ),
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const info = loginInfo?.email ? loginInfo : forgetPassInfo;
    try {
      await signIn({ email: info.email, password: info?.password || '', otp: data.otp, push });
    } catch {
      setError('otp', { message: 'The value is wrong, try again.' });
    }
  });

  return (
    <>
      <Stack spacing={1}>
        <Icon name="MailboxIcon" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t('login.TwoFactorAuthentication')}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t('login.enterOtp')}
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFCode name="otp" label="code" />
      </FormProvider>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <LoadingButton fullWidth onClick={onSubmit} loading={isSubmitting} disabled={!isValid}>
          {t('button.verify')}
        </LoadingButton>
      </Stack>
    </>
  );
};

export default TwoFAConfirm;
