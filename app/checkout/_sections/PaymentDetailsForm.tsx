'use client';

import { RHFCheckbox, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/form-provider';
import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { type ChangeEvent, type FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import zod from 'zod';

import { Image } from '@/components/image';
import Link from '@/components/link';
import LoadingButton from '@/components/loading-button';
import { useIsMobile } from '@/hooks/use-responsive';
import { useGetMe } from '@/services/minecraft/auth/auth';
import {
  useGetBillingAddress,
  usePostBillingAddress,
  usePostFinancialPay,
} from '@/services/minecraft/financial/financial';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

const currencyList = ['USDC', 'DAI', 'USDT', 'USDC.E'];
interface PaymentDetailsFormProps {
  planType: string;
}
const PaymentDetailsForm: FC<PaymentDetailsFormProps> = ({ planType }) => {
  const { replace } = useAppRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { data } = useGetMe();
  const userInfo = data?.data;
  const { t } = useTranslate();
  const { data: billingData } = useGetBillingAddress();

  const { mutateAsync: billingAddress, isPending: isBillingPending } = usePostBillingAddress();

  const { mutateAsync: createPay, isPending: isPayPending } = usePostFinancialPay();
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList?.[0]);

  const UpdateUserSchema = useMemo(
    () =>
      zod.object({
        email: zod.string(),
        first_name: zod.string().nonempty(t('formErrors.reqiredFirstName')),
        last_name: zod.string().nonempty(t('formErrors.reqiredLastName')),
        terms: zod.boolean().refine((val) => val, { message: t('formErrors.reqiredLastName') }),
        zip_code: zod.string().nonempty(t('formErrors.reqiredZipCode')),
        country: zod.string().nonempty(t('formErrors.reqiredCountry')),
        city: zod.string().nonempty(t('formErrors.reqiredCity')),
        address: zod.string().nonempty(t('formErrors.reqiredAddress')),
      }),
    [t]
  );

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: billingData?.data?.email_address || userInfo?.email || '',
      first_name: billingData?.data?.first_name || '',
      last_name: billingData?.data?.last_name || '',
      zip_code: billingData?.data?.zipcode || '',
      country: billingData?.data?.country || '',
      city: billingData?.data?.city || '',
      address: billingData?.data?.address || '',
      terms: false,
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, watch, reset } = methods;
  const { terms } = watch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(event.target.value);
    replace(`${pathname}/?plan_type=${planType}&symbol=${event.target.value}`);
  };

  const onSubmit = handleSubmit(async (data) => {
    billingAddress({ data: { ...data, email_address: userInfo?.email || '' } })
      .then(() => {
        createPay({ data: { plan_type: planType, symbol: selectedCurrency || 'USDC' } })
          .then((response) => {
            replace(`/checkout/qr-wallet?plan_type=${planType}&id=${response?.data?.id}`);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || 'An error occurred');
          });
      })
      .catch(() => toast.error(t('formErrors.formError')));
  });

  useEffect(() => {
    if (billingData && userInfo) {
      reset({
        email: billingData?.data?.email_address || userInfo?.email || '',
        first_name: billingData?.data?.first_name || '',
        last_name: billingData?.data?.last_name || '',
        zip_code: billingData?.data?.zipcode || '',
        country: billingData?.data?.country || '',
        city: billingData?.data?.city || '',
        address: billingData?.data?.address || '',
        terms: false,
      });
    }
  }, [billingData, userInfo]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <FormProvider methods={methods} onSubmit={onSubmit} sx={{ flexGrow: 1 }}>
        {/* Form Fields */}
        <Stack sx={{ flexGrow: 1, gap: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <RHFTextField
              name="email"
              label={t('checkout.email')}
              placeholder={userInfo?.email}
              sx={{ path: { stroke: (theme) => theme.palette.success.main } }}
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: <Icon name="CheckIcon" />,
                },
              }}
            />
            <RHFTextField
              name="first_name"
              label={t('checkout.firstName')}
              placeholder={t('checkout.firstNamePlaceHolder')}
            />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <RHFTextField
              name="last_name"
              label={t('checkout.lastName')}
              placeholder={t('checkout.lastNamePlaceHolder')}
            />
            <RHFTextField
              name="zip_code"
              label={t('checkout.zipCode')}
              placeholder={t('checkout.zipCodePlaceHolder')}
            />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <RHFTextField
              name="country"
              label={t('checkout.country')}
              placeholder={t('checkout.countryPlaceHolder')}
            />
            <RHFTextField
              name="city"
              label={t('checkout.city')}
              placeholder={t('checkout.cityPlaceHolder')}
            />
          </Stack>
          <RHFTextField
            name="address"
            label={t('checkout.address')}
            placeholder={t('checkout.addressPlaceHolder')}
          />
          <Stack spacing={1}>
            <Typography>{t('checkout.paymentMethod')}</Typography>
            <Stack alignItems={'center'} sx={{ textAlign: 'center' }} gap={1}>
              <RadioGroup
                sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                defaultValue={currencyList?.[0]}
                value={selectedCurrency}
                onChange={handleChange}
              >
                {currencyList.map((currency) => (
                  <FormControlLabel
                    key={currency}
                    sx={{
                      flex: '1 1 45%',
                      mx: 0,
                      justifyContent: 'space-between',
                      bgcolor: currency === selectedCurrency ? 'dark.3' : 'dark.2',
                      borderRadius: '12px',
                      border: '1.5px solid',
                      borderColor: 'dark.3',
                      p: 2,
                      height: '56px',
                    }}
                    labelPlacement="start"
                    value={currency}
                    control={<Radio disableTouchRipple disableRipple />}
                    label={
                      <Stack direction={'row'} gap={1}>
                        <Image src={`/assets/currencies/${currency}.svg`} alt={currency} />
                        <Typography variant="p2-medium">{currency}</Typography>
                      </Stack>
                    }
                  />
                ))}
              </RadioGroup>
            </Stack>
          </Stack>
          <Stack pl={0.5}>
            <RHFCheckbox
              label={
                <Typography sx={{ textWrap: 'nowrap' }}>
                  <Typography variant="p2-regular" color="grey.light">
                    {t('checkout.agreeTo')}
                  </Typography>{' '}
                  <Typography variant="p2-regular" component={Link} href="/terms-and-condition">
                    {t('checkout.termsAndConditions')}
                  </Typography>
                  {'  '}
                  {!isMobile && (
                    <Typography variant="p2-regular" color="grey.light">
                      {t('checkout.areclearandIagreeto')}
                    </Typography>
                  )}
                </Typography>
              }
              name="terms"
            />
          </Stack>
        </Stack>

        {/* button section */}
        <Stack alignItems={{ xs: 'start', md: 'center' }} sx={{ mt: 3 }}>
          <LoadingButton
            disabled={!terms}
            color="primary"
            size="large"
            type="submit"
            sx={{ width: '100%' }}
            loading={isBillingPending || isPayPending}
          >
            {t('checkout.payNow')}
          </LoadingButton>
        </Stack>
      </FormProvider>

      {/* PoweredByChainMind section only visible on mobile */}
      <Stack
        display={{ xs: 'flex', md: 'none' }}
        direction={'row'}
        justifyContent={'center'}
        spacing={3}
        pt={4}
      >
        <Typography variant="caption-semi-bold">{t('checkout.PoweredByChainMind')}</Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ border: '1.5px solid rgba(255, 255, 255, 0.08)', height: '16px' }}
        />
        <Typography variant="caption-medium">{t('checkout.legal')}</Typography>
      </Stack>
    </Box>
  );
};

export default PaymentDetailsForm;
