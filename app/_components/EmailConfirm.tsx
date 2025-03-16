import { Button, Stack, Typography } from '@mui/material';
import { useEffect, type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RHFCode } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import z from 'zod';
import { usePostAuthGuestToken, usePostAuthSendCode } from '@/services/minecraft/auth/auth';
import { useTranslate } from '@/locales';

import { useDispatch, useSelector } from 'react-redux';
import {
  setRegisterStep,
  setForgotPasswordStep,
  getRegisterInfo,
  getForgotPasswordInfo,
  getRegisterStep,
  setForgotPasswordInfo,
} from '@/lib/features/auth/authSlice';

import Icon from '@/components/icon';
import { signUp } from '@/auth';
import { useAppRouter } from '@/routes/hooks';
import useTimer from '@/hooks/use-timer';

const SECONDS = 90;

const EmailConfirm: FC = () => {
  const { push } = useAppRouter();
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const registerInfo = useSelector(getRegisterInfo);
  const forgotPasswordInfo = useSelector(getForgotPasswordInfo);
  const registerStep = useSelector(getRegisterStep);
  const email = registerStep === 2 ? registerInfo.email : forgotPasswordInfo.email;

  const { minutes, seconds, totalSeconds, restart } = useTimer({ expiryTimestamp: SECONDS });

  const methods = useForm({
    resolver: zodResolver(
      z.object({
        verifyCode: z.string().nonempty(t('formErrors.requiredCode')),
      })
    ),
    defaultValues: { verifyCode: '' },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync: sendCode, isPending: sendCodeLoading } = usePostAuthSendCode();
  const { mutateAsync: getSession } = usePostAuthGuestToken();

  const resendHandler = () => {
    sendCode({ data: { email } })
      .then(() => {
        restart(SECONDS);
      })
      .catch(() => setError('verifyCode', { message: t('formErrors.formError') }));
  };

  const onSubmit = handleSubmit(async (data) => {
    if (registerStep === 2) {
      try {
        await signUp({
          full_name: registerInfo.name,
          password: registerInfo.password,
          email,
          otp: data.verifyCode,
          push,
        });
      } catch {
        setError('verifyCode', {
          message: t('emailVerification.error'),
        });
      }
    } else {
      try {
        await getSession(
          { data: { otp: data.verifyCode, email } },
          {
            onSuccess(res) {
              dispatch(setForgotPasswordInfo({ email, token: res.data! }));
              dispatch(setForgotPasswordStep(3));
            },
          }
        );
      } catch (error) {
        setError('verifyCode', { message: error?.message });
      }
    }
  });

  useEffect(() => {
    if (watch('verifyCode').length === 6) {
      onSubmit();
    }
  }, [watch('verifyCode')]);

  const handleBack = () => {
    if (registerStep === 2) {
      dispatch(setRegisterStep(1));
    } else {
      dispatch(setForgotPasswordStep(1));
    }
  };

  return (
    <Stack gap={4}>
      <Stack spacing={1}>
        <Icon name="MailboxIcon" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t('emailVerification.title')}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t('emailVerification.subtitle')}{' '}
          <Typography variant="p2-regular" component={'span'}>
            {email}
          </Typography>
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFCode
          name="verifyCode"
          label={t('emailVerification.verifyCodeLabel')}
          loading={sendCodeLoading || isSubmitting}
        />
      </FormProvider>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Button fullWidth color="tertiary" onClick={handleBack}>
          {t('emailVerification.backButton')}
        </Button>
        {totalSeconds ? (
          <Typography
            sx={{ width: '100%', textAlign: 'center' }}
            color="grey.light"
            variant="p2-medium"
          >
            {`${t('emailVerification.resendWithTimer')} (${minutes.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')})`}
          </Typography>
        ) : (
          <Typography
            sx={{ width: '100%', textAlign: 'center', cursor: 'pointer' }}
            color="blue.light"
            variant="p2-medium"
            onClick={!sendCodeLoading ? resendHandler : undefined}
          >
            {t('emailVerification.resend')}
          </Typography>
        )}
      </Stack>
      <Typography variant="p2-regular" color="grey.light">
        {t('emailVerification.checkSpam')}
      </Typography>
    </Stack>
  );
};

export default EmailConfirm;
