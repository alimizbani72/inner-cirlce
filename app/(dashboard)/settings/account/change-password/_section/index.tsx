'use client';

import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogActions, Divider, IconButton, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';

import CustomDialog from '@/components/CustomDialog';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';
import useCustomRouter from '@/hooks/useCustomRouter';
import { useModalActivation } from '@/hooks/useModalActivation';
import { useTranslate } from '@/locales';
import {
  useGetMe,
  usePatchAuthChangePassword,
  usePostAuthSendCode,
} from '@/services/minecraft/auth/auth';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import zod from 'zod';

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePasswordDialog = () => {
  const open = useModalActivation('/change-password');
  const { push, nativeBack } = useCustomRouter();
  const userInfo = useGetMe();
  const { t } = useTranslate();

  const { mutateAsync, isPending } = usePatchAuthChangePassword();
  const { mutateAsync: sendVerification, isPending: isForgetPassPending } = usePostAuthSendCode();

  const UpdateUserSchema = zod
    .object({
      newPassword: zod
        .string()
        .nonempty(t('formErrors.requiredNewPassword'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          t('formErrors.newPasswordPattern')
        ),
      confirmNewPassword: zod.string(),
      currentPassword: zod.string().nonempty(t('formErrors.requiredCurrentPassword')),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t('formErrors.confirmPassword'),
      path: ['confirmNewPassword'],
    });

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({
        data: { old_password: data.currentPassword, new_password: data.newPassword },
      });
      reset();
      toast.success(t('changePassword.passwordChangedSuccess'));
      push('/settings/account');
    } catch (error) {
      toast.error(error?.response?.data?.message || t('changePassword.passwordChangedFailed'));
    }
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="change-password"
      open={open}
      onClose={nativeBack}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <IconButton onClick={nativeBack}>
              <Icon name="ArrowLeftIcon" />
            </IconButton>
            <Typography variant="h4-semi-bold" color={'common.white'}>
              {t('changePassword.title')}
            </Typography>
          </Stack>

          <IconButton onClick={nativeBack}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3, width: '100%', mt: 3 }}>
            <RHFTextField
              name="currentPassword"
              label={t('changePassword.currentPassword')}
              placeholder={t('changePassword.enterCurrentPassword')}
            />
            <Typography
              mt="-16px"
              variant="p2-medium"
              textAlign={'right'}
              onClick={async () => {
                await sendVerification({ data: { email: userInfo?.data?.data?.email! } }).then(
                  () => {
                    push('/settings/account/forget-password');
                  }
                );
              }}
              sx={{
                background: (theme) =>
                  isForgetPassPending ? theme.palette.grey.light : theme.palette.gradient.pink,
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                cursor: 'pointer',
              }}
            >
              {t('changePassword.forgotPassword')}
            </Typography>

            <RHFTextField
              name="newPassword"
              label={t('changePassword.newPassword')}
              placeholder={t('changePassword.enterNewPassword')}
              helperText={t('changePassword.passwordHelperText')}
            />
            <RHFTextField
              name="confirmNewPassword"
              label={t('changePassword.confirmNewPassword')}
              placeholder={t('changePassword.confirmNewPasswordPlaceholder')}
              helperText={t('changePassword.confirmPasswordHelperText')}
            />
          </FormProvider>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Button color="tertiary" onClick={nativeBack}>
            {t('button.cancel')}
          </Button>
          <LoadingButton color="primary" onClick={onSubmit} loading={isPending}>
            {t('changePassword.saveChange')}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default ChangePasswordDialog;
