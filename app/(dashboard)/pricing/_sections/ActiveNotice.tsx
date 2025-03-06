'use client';

import Icon from '@/components/icon';
import CustomDialog from '@/components/CustomDialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useIsMobile } from '@/hooks/use-responsive';
import {
  getGetFinancialPaymentsActiveQueryKey,
  usePostFinancialPaymentsActiveCancel,
} from '@/services/minecraft/financial/financial';
import { getQueryClient } from '@/app/_providers/customQueryClient';
import { toast } from 'sonner';
import { useTranslate } from '@/locales';
import LoadingButton from '@/components/loading-button';

type Props = {
  onClose: VoidFunction;
  open: string;
  handlePay: (plan_type: string) => void;
  handleOnContinue: () => void;
};

const ActiveNotice: FC<Props> = ({ onClose, open, handlePay, handleOnContinue }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const { mutateAsync, isPending } = usePostFinancialPaymentsActiveCancel();
  const queryClient = getQueryClient();
  const handleNewPayment = async () => {
    try {
      await mutateAsync(undefined, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: getGetFinancialPaymentsActiveQueryKey() });
        },
      });
      handlePay(open);
    } catch (error) {
      toast.error(error?.body?.message);
    }
  };
  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={onClose}
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
          <Icon name="WarningIcon" size={64} stroke="warning.main" />
          <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
            {t('pricing.continuePreviousPayment')}
          </Typography>
          <Typography variant="p2-regular" color={'grey.light'}>
            {t('pricing.wouldYouLikeToProceed')}
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            justifyContent={'space-between'}
            gap={2}
            sx={{ width: '100%', mt: 3 }}
          >
            <Button color="secondary" onClick={handleOnContinue}>
              {t('pricing.continue')}
            </Button>
            <LoadingButton onClick={handleNewPayment} loading={isPending}>
              {t('pricing.newPayment')}
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ActiveNotice;
