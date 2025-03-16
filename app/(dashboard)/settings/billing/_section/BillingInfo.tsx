import { useIsMobile } from '@/hooks/use-responsive';
import { Divider, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useTranslate } from '@/locales';
import { useGetBillingAddress } from '@/services/minecraft/financial/financial';
import ContentStack from '@app-components/ContentStack';

interface BillingInfoProps {}

const BillingInfo: FC<BillingInfoProps> = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const { data } = useGetBillingAddress();

  return (
    <>
      <ContentStack direction={{ md: 'row' }} gap={3} justifyContent="space-between">
        <Stack direction={{ md: 'row' }} gap={3}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.first_name || '---'}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t('billinghistory.firstName')}
            </Typography>
          </Stack>
          <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.last_name || '---'}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t('billinghistory.lastName')}
            </Typography>
          </Stack>
          <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.country || '---'}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t('billinghistory.country')}
            </Typography>
          </Stack>
          <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
          <Stack direction="row" gap={3}>
            <Stack mr={{ md: 'unset', xs: 'auto' }} gap={0.5}>
              <Typography variant="p2-medium">{data?.data?.city || '---'}</Typography>
              <Typography variant="caption-medium" color="grey.light">
                {t('billinghistory.city')}
              </Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack mr={{ md: 'unset', xs: 'auto' }} gap={0.5}>
              <Typography variant="p2-medium">{data?.data?.zipcode || '---'}</Typography>
              <Typography variant="caption-medium" color="grey.light">
                {t('billinghistory.zipCode')}
              </Typography>
            </Stack>
          </Stack>

          <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.address || '---'}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t('billinghistory.address')}
            </Typography>
          </Stack>
        </Stack>
      </ContentStack>
    </>
  );
};

export default BillingInfo;
