'use client';
import { useTranslate } from '@/locales';
import {
  useGetAffiliateMe,
  useGetAffiliateProgress,
} from '@/services/minecraft/affiliate/affiliate';
import { toNumber } from '@/utils/toNumber';
import { Box, Divider, Stack } from '@mui/material';
import { useMemo } from 'react';
import ProgressItem from './ProgressItem';
import CurrentandNextRank from './CurrentandNextRank';

const RankSection = () => {
  const { t } = useTranslate();
  const { data: me, isLoading: meIslaoding } = useGetAffiliateMe();
  const { data: progress, isLoading: progressIsLoading } = useGetAffiliateProgress();

  const overallProgressPercent = useMemo(
    () =>
      Object.values(progress?.data || {}).reduce(
        (total, { percent }) =>
          total + toNumber(percent) / Object.values(progress?.data || {}).length,
        0
      ),
    [progress?.data]
  );
  return (
    <Stack
      className={meIslaoding || progressIsLoading ? 'loading-skeleton' : ''}
      borderRadius={2}
      height={{ md: '200px', xs: '534px' }}
      border="1px solid"
      bgcolor="dark.2"
      borderColor="dark.3"
      direction={{ md: 'row' }}
      overflow="hidden"
    >
      {(me?.data || progress?.data) && (
        <>
          {/* current rank Section  */}
          <CurrentandNextRank
            type={me?.data?.rank?.type}
            percent={me?.data?.rank?.percent}
            goldCoins={me?.data?.goldCoins}
          />
          <Divider flexItem sx={{ borderWidth: '1px' }} />
          {/* progress Section  */}
          <Stack p={3} flex={4 / 12} gap={1} position={'relative'}>
            <Box
              sx={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)',
                width: 144,
                height: 144,
                borderRadius: '144px',
                position: 'absolute',
                left: { md: '50%', xs: '-100px' },
                transform: { md: 'translateX(-50%)', xs: 'translateY(-50%)' },
                top: { md: '-100px', xs: '50%' },
                filter: 'blur(100px)',
              }}
            />

            <Box
              sx={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)',
                width: 144,
                height: 144,
                borderRadius: '144px',
                position: 'absolute',
                left: { md: '50%' },
                right: { md: 'unset', xs: '-100px' },
                transform: { md: 'translateX(-50%)', xs: 'translateY(-50%)' },
                bottom: { md: '-100px' },
                top: { md: 'unset', xs: '50%' },
                filter: 'blur(100px)',
              }}
            />
            <ProgressItem
              percent={toNumber(progress?.data?.first_line?.percent)}
              title={t('afDashboardTab.first')}
            />
            <ProgressItem
              percent={toNumber(progress?.data?.second_line?.percent)}
              title={t('afDashboardTab.second')}
            />
            <ProgressItem
              percent={toNumber(progress?.data?.third_line?.percent)}
              title={t('afDashboardTab.third')}
            />
            <ProgressItem
              percent={toNumber(progress?.data?.other_lines?.percent)}
              title={t('afDashboardTab.other')}
            />
            <ProgressItem
              overall
              percentVarient
              percent={overallProgressPercent}
              title={t('afDashboardTab.overall')}
            />
          </Stack>
          <Divider flexItem sx={{ borderWidth: '1px' }} />
          {/* next rank Section  */}
          <CurrentandNextRank
            isNextRank
            type={me?.data?.next_rank?.type}
            percent={me?.data?.next_rank?.percent}
            goldCoins={me?.data?.next_rank?.gold_coins}
          />
        </>
      )}
    </Stack>
  );
};

export default RankSection;
