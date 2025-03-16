'use client';

import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import AssetCard from './AssetCard';
import { flexItem } from '@/utils/grid';
import NeedHelp from './NeedHelp';
import { useTranslate } from '@/locales';
import { useGetAffiliateMarketingAssets } from '@/services/minecraft/affiliate/affiliate';
import LoadingCard from './LoadingCard';

const AffiliateMarketingAssetsSection: FC = () => {
  const { t } = useTranslate();
  const { data, isLoading } = useGetAffiliateMarketingAssets();

  return (
    <Stack p={{ md: 4, xs: 3 }} gap={2} alignItems="center" position="relative">
      <Stack maxWidth={840} width={1} gap={3}>
        <Stack gap={1}>
          <Typography variant="h4-semi-bold">{t('marketingassetTab.marketingAssets')}</Typography>
          <Typography variant="p2-regular" color="#BBBDD0">
            {t('marketingassetTab.welcomeMessage')}
          </Typography>
        </Stack>

        <Stack gap={2}>
          <Typography variant="h4-semi-bold">
            {t('marketingassetTab.downloadableAssets')}
          </Typography>
          {isLoading ? (
            <LoadingCard />
          ) : (
            <Stack gap={3} flexWrap="wrap" direction={{ md: 'row' }}>
              {data?.data?.map((item) => (
                <AssetCard
                  key={item.title}
                  sx={flexItem({ count: { md: 3, xs: 0 }, gap: 24 })}
                  type={item.type!}
                  title={item.title!}
                  description={item.description!}
                  items={item.items}
                />
              ))}
            </Stack>
          )}
        </Stack>

        <Stack gap={1}>
          <Typography variant="h4-semi-bold">{t('marketingassetTab.howtoUseOurAssets')}</Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              {t('marketingassetTab.attribution')}:
            </Typography>{' '}
            {t('marketingassetTab.WheneveryouuseourassetsMEssage')}
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              {t('marketingassetTab.modification')}:
            </Typography>{' '}
            {t('marketingassetTab.feelfreeMessage')}
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              {t('marketingassetTab.sharing')}:
            </Typography>{' '}
            {t('marketingassetTab.encourageMessage')}{' '}
          </Typography>
        </Stack>

        <NeedHelp />

        <Typography variant="h4-medium" textAlign="center">
          <Typography variant="h4-medium" color="pink.light">
            {t('marketingassetTab.thankyou')}
          </Typography>{' '}
          {t('marketingassetTab.forhelpingusgrowourcommunity')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AffiliateMarketingAssetsSection;
