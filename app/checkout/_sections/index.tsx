'use client';

import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { useAppRouter, useSearchParams } from '@/routes/hooks';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PaymentDetailsForm from './PaymentDetailsForm';
import PaymentReceipt from './PaymentReceipt';

const CheckoutSection = () => {
  const { t } = useTranslate();
  const { back } = useAppRouter();
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan_type');

  return (
    <Stack direction={{ md: 'row' }} flex={1} minHeight={'100%'} position={'relative'}>
      {/* Receipt */}
      <Stack
        sx={{
          position: 'relative',
          background: (theme) => theme.palette.gradient.blue,
          flex: 1,
          py: { md: 8, xs: 3 },
        }}
        alignItems={'center'}
        overflow={'hidden'}
      >
        <Typography
          sx={{ top: '50%', transform: 'translateY(-110%)', display: { md: 'block', xs: 'none' } }}
          position={'absolute'}
          fontSize={'88px'}
          fontWeight={600}
          lineHeight={'120px'}
          whiteSpace={'nowrap'}
          zIndex={1}
          textTransform={'uppercase'}
          color={'rgba(255, 255, 255, 0.08)'}
        >
          • {planType} • {planType} •
        </Typography>
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img
            src="/assets/svg/checkout-texture.svg"
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Stack
          position={'relative'}
          zIndex={2}
          gap={1}
          direction="row"
          alignItems="center"
          width="100%"
          maxWidth={{ md: '486px' }}
          px={3}
        >
          <IconButton onClick={() => back()}>
            <Icon name="ArrowLeftIcon" />
          </IconButton>
          <Typography variant="h4-semi-bold">{t('checkout.yourOrder')}</Typography>
        </Stack>
        <Divider
          flexItem
          sx={{ mt: 3, mb: { md: 4, xs: 3 }, borderColor: 'rgba(255, 255, 255, 0.08)' }}
        />
        <Stack
          position={'relative'}
          zIndex={2}
          width="100%"
          maxWidth={{ md: '486px' }}
          px={3}
          justifyContent="center"
          height={'100%'}
        >
          <PaymentReceipt planType={planType!} />
        </Stack>
      </Stack>
      {/* Form */}
      <Stack sx={{ bgcolor: 'dark.1', flex: 1, py: { md: 8, xs: 3 } }} alignItems={'center'}>
        <Stack
          position={'relative'}
          zIndex={2}
          direction="row"
          alignItems="center"
          width="100%"
          maxWidth="220px"
          textAlign={'center'}
          px={3}
        >
          <Typography variant="h4-semi-bold">{t('checkout.paymentDetail')}</Typography>
        </Stack>
        <Divider flexItem sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
        <Stack
          position={'relative'}
          height={'100%'}
          zIndex={2}
          width="100%"
          px={{ xs: 3, md: 8.5 }}
        >
          <PaymentDetailsForm planType={planType!} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckoutSection;
