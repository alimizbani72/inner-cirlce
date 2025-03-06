'use client';

import { Button, DialogActions, Divider, IconButton, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFTextField } from '@/components/hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import zod from 'zod';
import CustomDialog from '@/components/CustomDialog';
import { useTranslate } from '@/locales';
import { useModalActivation } from '@/hooks/useModalActivation';
import useCustomRouter from '@/hooks/useCustomRouter';
import Icon from '@/components/icon';
import QRCodeWithIcon from '@/components/QRCodeWithIcon';
import CustomizedSteppers from '@/components/CustomizedSteppers';
import LoadingButton from '@/components/loading-button';

const TwoFactorDialog = () => {
  const open = useModalActivation('/2fa');
  const { push, nativeBack } = useCustomRouter();
  const { t } = useTranslate();

  const FormSchema = useMemo(
    () =>
      zod.object({
        authcode: zod.string(),
      }),
    []
  );
  const defaultValues = useMemo(
    () => ({
      authcode: '',
    }),
    []
  );
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const onSubmit = () => push('/settings/become-partner/success');

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="2fa"
      open={open}
      onClose={() => push('/settings/become-partner/')}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={'common.white'}>
              {t('twoFactorDialog.title')}
            </Typography>
          </Stack>

          <IconButton onClick={() => push('/settings/become-partner/')}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3}>
          <CustomizedSteppers activeStep={2} />

          <Divider flexItem />
          <Stack gap={3} justifyContent={'center'}>
            <Stack gap={2}>
              <Typography variant="p2-regular">{t('twoFactorDialog.securityMessage')}</Typography>
              <Typography variant="p2-regular">{t('twoFactorDialog.qrInstruction')}</Typography>
            </Stack>
            <Stack alignItems={'center'} sx={{ width: '100%' }}>
              <QRCodeWithIcon value={'https://google.com'} iconSrc="/logo/logo.svg" size={123} />
            </Stack>
            <FormProvider
              methods={methods}
              onSubmit={onSubmit}
              sx={{ gap: 5, alignItems: 'flex-start' }}
            >
              <RHFTextField
                name="authcode"
                label={t('twoFactorDialog.authCodeLabel')}
                placeholder={t('twoFactorDialog.authCodePlaceholder')}
              />
            </FormProvider>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Button color="tertiary" onClick={nativeBack}>
            {t('twoFactorDialog.backButton')}
          </Button>
          <LoadingButton color="primary" onClick={onSubmit}>
            {t('twoFactorDialog.nextStepButton')}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TwoFactorDialog;
