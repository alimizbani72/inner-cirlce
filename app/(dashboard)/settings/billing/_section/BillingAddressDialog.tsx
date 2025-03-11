import { getQueryClient } from '@/app/_providers/customQueryClient';
import CustomDialog from '@/components/CustomDialog';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import Icon from '@/components/icon';
import LoadingButton from '@/components/loading-button';
import { useTranslate } from '@/locales';
import { useGetMe } from '@/services/minecraft/auth/auth';
import {
  getGetBillingAddressQueryKey,
  usePostBillingAddress,
} from '@/services/minecraft/financial/financial';
import type { BillingAddressHttpBillingAddressResponse } from '@/services/minecraft/minecraftAPI.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { type FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import zod from 'zod';

interface BillingAddressDialogProps {
  close: VoidFunction;
  open: boolean;
  info?: BillingAddressHttpBillingAddressResponse;
}

const BillingAddressDialog: FC<BillingAddressDialogProps> = ({ open, close, info }) => {
  const { t } = useTranslate();
  const queryClient = getQueryClient();
  const { data } = useGetMe();
  const userInfo = data?.data;

  const { mutateAsync, isPending } = usePostBillingAddress();

  const UpdateUserSchema = useMemo(
    () =>
      zod.object({
        country: zod.string().nonempty(t('billinghistory.countryFieldisRequired')),
        city: zod.string().nonempty(t('billinghistory.citFieldisRequired')),
        zip_code: zod.string().nonempty(t('billinghistory.zipcodeFieldisRequired')),
        address: zod.string().nonempty(t('billinghistory.addressFieldisRequired')),
        first_name: zod.string().nonempty(t('billinghistory.firstnameFieldisRequired')),
        last_name: zod.string().nonempty(t('billinghistory.lastnameFieldisRequired')),
      }),
    [t]
  );

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      country: info?.country || '',
      city: info?.city || '',
      zip_code: info?.zipcode || '',
      address: info?.address || '',
      first_name: info?.first_name || '',
      last_name: info?.last_name || '',
    },
    mode: 'onSubmit',
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    mutateAsync({ data: { ...data, email_address: info?.email_address || userInfo?.email || '' } })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: getGetBillingAddressQueryKey() });
        toast.success(t('billinghistory.successMessage'));
        close();
      })
      .catch(() => toast.error(t('formErrors.formError')));
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" open={open} onClose={close}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={'common.white'}>
              {info?.address ? 'Change billing address' : 'Setup billing address'}
            </Typography>
          </Stack>

          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <FormProvider methods={methods} sx={{ gap: 3, width: '100%', mt: 3 }}>
            <Stack direction={{ md: 'row' }} gap={3}>
              <RHFTextField
                name="first_name"
                label={t('billinghistory.firstName')}
                placeholder={t('billinghistory.firstNamePlaceHolder')}
              />
              <RHFTextField
                name="last_name"
                label={t('billinghistory.lastName')}
                placeholder={t('billinghistory.lastNamePlaceHolder')}
              />
            </Stack>
            <Stack direction={{ md: 'row' }} gap={3}>
              <RHFTextField
                name="country"
                label={t('billinghistory.country')}
                placeholder={t('billinghistory.countryPlaceHolder')}
              />
              <RHFTextField
                name="city"
                label={t('billinghistory.city')}
                placeholder={t('billinghistory.cityPlaceHolder')}
              />
            </Stack>
            <RHFTextField
              name="zip_code"
              label={t('billinghistory.zipCode')}
              placeholder={t('billinghistory.zipCodePlaceHolder')}
            />
            <RHFTextField
              name="address"
              label={t('billinghistory.address')}
              placeholder={t('billinghistory.addressPlaceHolder')}
            />
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={'row'} gap={2} justifyContent="space-between">
          <Button color="tertiary" onClick={close}>
            {t('billinghistory.back')}
          </Button>
          <LoadingButton onClick={onSubmit} loading={isPending}>
            {info?.address ? t('billinghistory.saveChanges') : t('billinghistory.submitSetup')}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BillingAddressDialog;
