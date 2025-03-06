'use client';
import Icon from '@/components/icon';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormProvider from '@/components/hook-form/form-provider';

import zod from 'zod';
import { Button } from '@mui/material';
import { useTranslate } from '@/locales';
import { RHFCode, RHFTextField } from '@/components/hook-form';
import { useTimer } from 'react-timer-hook';
import { toNumber } from 'lodash';

import { useEffect, useState } from 'react';
import CustomDialog from '@/components/CustomDialog';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/lib/features/user/userSlice';
import { useModalActivation } from '@/hooks/useModalActivation';
import useCustomRouter from '@/hooks/useCustomRouter';
import {
  usePostAuthGuestToken,
  usePostAuthResetPassword,
  usePostAuthSendCode,
} from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import LoadingButton from '@/components/loading-button';

const getTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + toNumber(90));
  return time;
};

const ForgetPasswordDialog = () => {
  const open = useModalActivation('/forget-password/');

  const { t } = useTranslate();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(1);
  const userInfo = useAppSelector(selectUser);
  const { minutes, seconds, totalSeconds, restart } = useTimer({ expiryTimestamp: getTimer() });
  const { mutateAsync: sendCode, isPending: sendCodeLoading } = usePostAuthSendCode();
  const { mutateAsync: exchangeCode, data: exchangeData } = usePostAuthGuestToken();

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    usePostAuthResetPassword();

  const { push, nativeBack } = useCustomRouter();

  const methods = useForm({
    resolver: zodResolver(
      zod
        .object({
          verifyCode: zod.string().nonempty(t('formErrors.requiredCode')),
          password: zod
            .string()
            .nonempty(t('formErrors.requiredPassword'))
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              t('formErrors.passwordPattern')
            ),
          confirmPass: zod.string(),
        })
        .refine((data) => data.password === data.confirmPass, {
          message: t('formErrors.confirmPassword'),
          path: ['confirmPass'],
        })
    ),
    defaultValues: { verifyCode: '', password: '', confirmPass: '' },
    mode: 'onSubmit',
  });

  const { handleSubmit, watch, reset, setError } = methods;
  const submitExchangeCode = async () => {
    setLoading(true);
    try {
      await exchangeCode({ data: { email: userInfo?.email || '', otp: watch('verifyCode') } });

      setFormState(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('verifyCode', { message: error?.message });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (formState === 2) {
      try {
        await resetPassword({
          data: { password: data?.password },
          params: { _token: exchangeData?.data || '' },
        });
        reset();
        toast.success(t('forgetPassword.passwordChanged'));
        push('/setting/account');
      } catch (error) {
        toast.error(error?.message || t('forgetPassword.failedToVerifyCode'));
      }
    }
  });

  const resendHandler = () => {
    sendCode({ data: { email: userInfo?.email || '' } })
      .then(() => {
        restart(getTimer());
      })
      .catch(() => setError('verifyCode', { message: t('formErrors.formError') }));
  };

  useEffect(() => {
    if (watch('verifyCode').length === 6) {
      submitExchangeCode();
    }
  }, [watch('verifyCode')]);

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="forgot-password"
      open={open}
      onClose={() => push('/settings/account')}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={'common.white'}>
              {formState === 1
                ? t('forgetPassword.forgotPassword')
                : t('forgetPassword.createNewPassword')}
            </Typography>
          </Stack>

          <IconButton onClick={() => push('/settings/account')}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack>
          {formState === 1 ? (
            <>
              <Stack spacing={1} mb={4}>
                <Icon name="MailboxIcon" size={64} />
                <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
                  {t('emailVerification.title')}
                </Typography>
                <Typography variant="p2-regular" color="grey.light">
                  {t('emailVerification.subtitle')}{' '}
                  <Typography variant="p2-regular" component={'span'}>
                    {userInfo?.email}
                  </Typography>
                </Typography>
              </Stack>

              <FormProvider methods={methods}>
                <RHFCode
                  name="verifyCode"
                  label={t('emailVerification.verifyCodeLabel')}
                  loading={sendCodeLoading || loading}
                />
              </FormProvider>
              <Stack direction={'row'} spacing={2} alignItems={'center'} mt={5} mb={3}>
                <Button fullWidth color="tertiary" onClick={nativeBack}>
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
                    onClick={resendHandler}
                  >
                    {t('emailVerification.resend')}
                  </Typography>
                )}
              </Stack>
              <Typography variant="p2-regular" color="grey.light">
                {t('emailVerification.checkSpam')}
              </Typography>
            </>
          ) : (
            <Stack gap={5}>
              <Typography variant="h3-semi-bold">
                {t('forgetPassword.createNewPassword')}
              </Typography>
              <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
                <RHFTextField
                  name="password"
                  label={t('forgetPassword.newPassword')}
                  placeholder={t('forgetPassword.enterNewPassword')}
                  helperText={t('forgetPassword.passwordHelperText')}
                />
                <RHFTextField
                  name="confirmPass"
                  label={t('forgetPassword.confirmNewPassword')}
                  placeholder={t('forgetPassword.confirmNewPasswordPlaceholder')}
                  helperText={t('forgetPassword.confirmPasswordHelperText')}
                />
              </FormProvider>

              <LoadingButton loading={isResetPasswordPending} type="submit" onClick={onSubmit}>
                {t('forgetPassword.resetPassword')}
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ForgetPasswordDialog;
