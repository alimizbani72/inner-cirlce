'use client';

import DialogTitle from '@mui/material/DialogTitle';
import CustomDialog from '@/components/CustomDialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { formatCurrency, toNumber } from '@/utils/toNumber';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import { useTranslate } from '@/locales';
import { LoadingButton } from '@mui/lab';
import { getQueryClient } from '@/app/_providers/customQueryClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useOTP from '@/hooks/useOTP';
import { useGetWalletDefault } from '@/services/minecraft/wallet/wallet';
import {
  getGetFinancialInfoQueryKey,
  useGetFinancialInfo,
  usePostFinancialWithdraw,
} from '@/services/minecraft/financial/financial';
import type { PayoutHttpWithdrawRequest } from '@/services/minecraft/minecraftAPI.schemas';
import { toast } from 'sonner';
import Icon from './icon';

type Props = {
  close: VoidFunction;
  open: boolean;
};

const WithdrawDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const { data: walletDefault } = useGetWalletDefault();
  const { data: financialInfo } = useGetFinancialInfo();
  const { mutateAsync, isPending } = usePostFinancialWithdraw();
  const queryClient = getQueryClient();
  const schema = z.object({
    amount: z.string().nonempty(t('withdraw.requiredAmount')),
    address: z.string().nonempty(t('withdraw.requiredWallet')),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { amount: '', address: `${walletDefault?.data?.address || ''}` },
    mode: 'onSubmit',
  });
  const { handleSubmit, reset, resetField, watch } = methods;
  const { serviceHandler } = useOTP();

  const onSubmit = handleSubmit((data) => {
    const withdrawFunc = async (otp: string) => {
      try {
        await mutateAsync(
          {
            data: {
              otp,
              //TODO: Fix This , check with backend
              amount: { value: data.amount, currency_code: 'USD' },
              wallet_id: `${walletDefault?.data?.id}`,
            } as PayoutHttpWithdrawRequest,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: getGetFinancialInfoQueryKey() });
              toast.success(t('withdraw.submitRequest'));
              close();
              reset();
              resetField('amount');
            },
            onError: (error: any) => {
              toast.error(error?.body?.message || t('formErrors.formError'));
            },
          }
        );
      } catch (error) {
        toast.error(error?.body?.message || t('formErrors.formError'));
      }
    };

    serviceHandler(withdrawFunc);
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="withdraw-dialog"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="withdraw-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={'common.white'}>
            {t('withdraw.Withdraw')}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">
              {formatCurrency(financialInfo?.data?.available_for_withdraw)}
            </Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t('withdraw.availableWithdraw')}
            </Typography>
          </Stack>

          <RHFTextField
            name="amount"
            label={t('withdraw.amount')}
            placeholder={t('withdraw.enterAmount')}
            isMoney
          />
          <RHFTextField
            name="address"
            label={t('withdraw.address')}
            slotProps={{
              input: { readOnly: true },
            }}
          />
          <Stack component={'ul'} pl={3}>
            <Typography component={'li'} variant="p2-regular" color="grey.light">
              {t('withdraw.feeWithdrawal')}
            </Typography>
            <Typography component={'li'} variant="p2-regular" color="grey.light">
              {t('withdraw.minimumAmount')}
            </Typography>
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Button color="tertiary" onClick={close}>
            {t('button.cancel')}
          </Button>
          <LoadingButton
            loading={isPending}
            onClick={onSubmit}
            disabled={!(toNumber(watch('amount')) > 99 && walletDefault?.data?.address)}
          >
            {t('withdraw.Withdraw')}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default WithdrawDialog;
