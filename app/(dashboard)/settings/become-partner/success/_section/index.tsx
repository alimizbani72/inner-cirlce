'use client';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@/components/icon';
import CustomDialog from '@/components/CustomDialog';
import { useModalActivation } from '@/hooks/useModalActivation';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';

const SuccessDialog = () => {
  const open = useModalActivation('/success');
  const { push } = useAppRouter();
  const { t } = useTranslate();

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="success"
      open={open}
      onClose={() => push('/settings/become-partner/')}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3} alignItems={'center'}>
          <IconButton
            disabled
            sx={{
              '&.Mui-disabled': {
                bgcolor: '#00B171',
              },
              width: '40px !important',
              height: '40px !important',
            }}
          >
            <Icon name="CheckIcon" size={40} />
          </IconButton>
          <Stack gap={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h4-semi-bold">{t('successDialog.requestSent')}</Typography>
            <Typography variant="p2-regular">{t('successDialog.reviewMessage')}</Typography>
          </Stack>
          <Button color="tertiary" onClick={() => push('/settings/become-partner/')}>
            {t('successDialog.backToHome')}
          </Button>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default SuccessDialog;
