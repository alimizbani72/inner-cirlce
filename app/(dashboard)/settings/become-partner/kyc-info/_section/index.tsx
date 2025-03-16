'use client';
import CustomDialog from '@/components/CustomDialog';
import CustomizedSteppers from '@/components/CustomizedSteppers';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';
import { kycCallback } from '@/consts';
import useCustomRouter from '@/hooks/useCustomRouter';
import { useModalActivation } from '@/hooks/useModalActivation';
import { useTranslate } from '@/locales';
import { useGetMe } from '@/services/minecraft/auth/auth';
import { usePostKycVerification } from '@/services/minecraft/kyc/kyc';
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { usePathname } from 'next/navigation';

const KYCInfoDialog = () => {
  const { data } = useGetMe();
  const userInfo = data?.data;
  const { mutateAsync, isPending } = usePostKycVerification();

  const pathname = usePathname();
  const open = useModalActivation('/kyc-info');

  const { push, nativeBack } = useCustomRouter();
  const { t } = useTranslate();

  const onSubmit = async () => {
    try {
      const res = await mutateAsync({
        data: { redirect_url: kycCallback(pathname) },
      });
      if (res.data?.verification_url) {
        window.location.href = res.data?.verification_url;
      }
    } catch (_error) {
      // console.log(_error);
    }
  };
  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="kyc-info"
      open={open}
      onClose={() => push('/settings/become-partner/')}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={'common.white'}>
              {t('kycInfoDialog.title')}
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
          <CustomizedSteppers activeStep={0} />

          <Divider flexItem />
          <Stack
            gap={1}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ textAlign: 'center' }}
          >
            <Icon name="KycIcon" size={64} />
            <Typography variant="p2-regular">{t('kycInfoDialog.description')}</Typography>
            <LoadingButton
              color="primary"
              onClick={onSubmit}
              sx={{ mt: 2 }}
              loading={isPending}
              disabled={userInfo?.kyc_status}
            >
              {t('kycInfoDialog.doKycNow')}
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Button color="tertiary" onClick={nativeBack}>
            {t('kycInfoDialog.backButton')}
          </Button>
          <Button
            color="primary"
            onClick={() => push('/settings/become-partner/success')}
            disabled={!userInfo?.kyc_status}
          >
            {t('kycInfoDialog.nextStepButton')}
          </Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default KYCInfoDialog;
