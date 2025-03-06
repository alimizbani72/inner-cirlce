import { Stack, Typography, Button } from '@mui/material';
import { useMemo, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';

import z from 'zod';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  getForgotPasswordInfo,
  setForgotPasswordInfo,
  setForgotPasswordStep,
} from '@/lib/features/auth/authSlice';

import { usePostAuthEmailExists, usePostAuthSendCode } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';

const ForgotPass: FC = () => {
  const { t } = useTranslate();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(getForgotPasswordInfo);

  const FormSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .nonempty(t('formErrors.requiredEmail'))
          .email(t('formErrors.invalidEmail')),
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
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { handleSubmit, setError } = methods;

  const { mutateAsync: checkEmail, isPending: checkEmailLoading } = usePostAuthEmailExists();
  const { mutateAsync, isPending } = usePostAuthSendCode();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const checkEmailResult = await checkEmail({
        data: { email: data.email },
      });
      if (checkEmailResult.data) {
        await mutateAsync({ data: { email: data.email } });
        dispatch(setForgotPasswordInfo({ email: data.email?.toLowerCase(), token: '' }));
        dispatch(setForgotPasswordStep(2));
      } else {
        setError('email', { message: t('formErrors.userNotFound') });
      }
    } catch (_error) {
      toast.error(t('formErrors.formError'));
    }
  });
  return (
    <Stack gap={4}>
      <Stack spacing={1}>
        <Icon name="PasswordIcon" size={64} />
        <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
          {t('passwordRecovery.title')}
        </Typography>
        <Typography variant="p2-regular" color="grey.light">
          {t('passwordRecovery.subtitle')}
        </Typography>
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 5 }}>
        <RHFTextField
          name="email"
          label={t('passwordRecovery.emailLabel')}
          placeholder={t('passwordRecovery.emailPlaceholder')}
        />
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
          <Button fullWidth color="tertiary" size="large" onClick={() => push('/login')}>
            {t('passwordRecovery.backButton')}
          </Button>
          <LoadingButton
            loading={isPending || checkEmailLoading}
            fullWidth
            color="primary"
            size="large"
            type="submit"
          >
            {t('passwordRecovery.continueButton')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
};
export default ForgotPass;
