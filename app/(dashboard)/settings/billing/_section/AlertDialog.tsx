'use client';

import CustomDialog from '@/components/CustomDialog';
import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { Button, DialogContent, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

interface BillingAddressAlertDialogProps {
  close: VoidFunction;
  open: boolean;
  onSubmit: VoidFunction;
}

const BillingAddressAlertDialog: FC<BillingAddressAlertDialogProps> = ({
  open,
  close,
  onSubmit,
}) => {
  const { t } = useTranslate();
  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={close}
      aria-labelledby="withdraw-dialog"
      open={!!open}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ px: 3, textAlign: 'center' }}
          gap={1}
        >
          <Icon name="WarningIcon" stroke="danger.main" size={64} />
          <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
            {t('billinghistory.setupbillingAddress')}
          </Typography>
          <Typography variant="p2-regular" color={'grey.light'}>
            {t('billinghistory.dwonloadmessage')}
          </Typography>
          <Stack
            direction={{ md: 'row' }}
            justifyContent={'space-between'}
            gap={2}
            sx={{ width: '100%', mt: 3 }}
          >
            <Button color="tertiary" fullWidth onClick={close}>
              {t('billinghistory.discard')}
            </Button>
            <Button fullWidth onClick={onSubmit}>
              {t('billinghistory.setupNow')}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default BillingAddressAlertDialog;
