'use client';

import { Image } from '@/components/image';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { useGetGlobalsBecomeAPartner } from '@/services/cms/global-becomeapartner/global-becomeapartner';
import { Button, Skeleton, Stack, Typography } from '@mui/material';

const BecomeAPartnerSection = () => {
  const lang = useAppSelector(selectLang);
  const { push } = useAppRouter();
  const { data, isFetching } = useGetGlobalsBecomeAPartner({ locale: lang as string });
  const { t } = useTranslate();

  return (
    <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          {t('becomePartner.title')}
        </Typography>
      </Stack>

      <Stack maxWidth={{ md: 360 }} gap={3} justifyContent={'center'} alignItems={'center'}>
        <Image src="/assets/png/partner.png" />
        {isFetching ? (
          <Skeleton height={200} width="100%" />
        ) : (
          <>
            <Typography variant="p2-regular">{data?.data?.text}</Typography>
            <Button fullWidth onClick={() => push('become-partner/kyc-info')}>
              {data?.data?.button}
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default BecomeAPartnerSection;
