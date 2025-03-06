'use client';
import { Box, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useAppSelector } from '@/lib/hooks';
import { useGetGlobalsAffilateRules } from '@/services/cms/global-affilaterules/global-affilaterules';
import { Image } from '@/components/image';

const CMSContentParser = dynamic(() => import('@app-components/CMSContentParser'), { ssr: false });

const AffiliateMarketingRulesSection: FC = () => {
  const lang = useAppSelector(selectLang);
  const { data, isLoading } = useGetGlobalsAffilateRules({ locale: lang });

  return (
    <Stack p={{ md: 4, xs: 3 }} gap={2} alignItems="center" position="relative">
      <Stack maxWidth={744}>
        <Image src="/assets/png/rules.png" width="100%" />
        <Stack borderRadius={1} className={isLoading ? 'loading-skeleton' : ''}>
          <CMSContentParser layout={data?.data.layout} />
        </Stack>
      </Stack>

      <Box
        sx={{
          position: { md: 'sticky', xs: 'fixed' },
          mt: { md: '-90px' },
          left: 0,
          bottom: '-1px',
          right: 0,
          height: '120px',
          width: '100%',
          background: 'linear-gradient(180deg, rgba(7, 7, 32, 0.00) 0%, #070720 100%)',
        }}
      />
    </Stack>
  );
};

export default AffiliateMarketingRulesSection;
