'use client';

import { useEffect, useState, type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';

import { useAppSelector } from '@/lib/hooks';
import { CMSDownloadURL, getUserPlanType } from '@/consts';
import { toNumber } from '@/utils/toNumber';
import type { DropZone } from '@/services/cms/chainmindCms.schemas';
import { Image } from '@/components/image';
import Icon from '@/components/icon';
import CustomTable from '@/components/CustomTable';
import { useGetGlobalsDropZone } from '@/services/cms/global-dropzone/global-dropzone';
import RiveComp from '@/components/rive-loader';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useGetMe } from '@/services/minecraft/auth/auth';

const columns = [
  {
    title: 'Name',
    modify: (row: DropZone['coins'][number]) => (
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Image src={CMSDownloadURL((row?.icon as any)?.url!)} width={24} height={24} />
        <Typography variant="p2-medium">{row.name}</Typography>
        <Typography variant="p2-medium" color="grey.light">
          {row.name}
        </Typography>
      </Stack>
    ),
  },
  {
    title: 'cmrValue',
    modify: (row: DropZone['coins'][number]) => row.cmrValue,
  },
  {
    title: 'potentialMultiplicator',
    modify: (row: DropZone['coins'][number]) => row.potentialMultiplicator,
  },
];

const DropZone: FC = () => {
  const lang = useAppSelector(selectLang);
  const { data } = useGetGlobalsDropZone({ locale: lang as string });
  const [isClient, setIsClient] = useState(false);
  const [finishedCountdown, setFinishedCountdown] = useState(
    toNumber(data?.data.timestampUnix) * 1000 < new Date().getTime()
  );
  const { data: userInfo } = useGetMe();
  const userPlan = getUserPlanType(userInfo?.data);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return data?.data.status === 'active' && finishedCountdown ? (
    <CustomTable
      title="Drop Zone"
      columns={columns}
      data={
        data?.data.coins.filter((item: any) =>
          item.membership.find((mem: any) => mem.slug === userPlan)
        ) || []
      }
    />
  ) : (
    <Stack
      position="relative"
      overflow="hidden"
      borderRadius={2}
      border="1.5px solid"
      borderColor="dark.3"
      bgcolor="dark.2"
      flex={1}
      minHeight={{ md: 'auto', xs: '400px' }}
    >
      <Box
        sx={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)',
          width: { md: 288, xs: 288 },
          height: { md: 288, xs: 288 },
          borderRadius: { md: '288px', xs: '288px' },
          position: 'absolute',
          left: { md: '-144px', xs: '-144px' },
          top: { md: '-144px', xs: '-144px' },
          filter: 'blur(140px)',
        }}
      />

      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/assets/svg/texture.svg"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)',
          width: { md: 288, xs: 288 },
          height: { md: 288, xs: 288 },
          borderRadius: { md: '288px', xs: '288px' },
          position: 'absolute',
          right: { md: '-144px', xs: '-144px' },
          bottom: { md: '-144px', xs: '-144px' },
          filter: 'blur(140px)',
        }}
      />

      <Typography pt={3} px={3} pb={2} position="relative" variant="p1-semi-bold" color="white">
        Drop Zone
      </Typography>

      <img src="/assets/svg/drop-zone.svg" width="100%" height="100%" />

      <Stack
        sx={{
          aspectRatio: 1,
          position: 'absolute',
          top: { md: 30, xs: 50 },
          right: 0,
          left: { md: 'unset', xs: 0 },
          bottom: { md: 24 },
          alignItems: 'center',
        }}
        width={{ md: 300, xs: 1 }}
        height={300}
      >
        <RiveComp src="/assets/rive/flying_box.riv" width={300} height={300} />
      </Stack>

      <Stack
        sx={{
          position: 'absolute',
          bottom: { md: 60, xs: 24 },
          left: { md: 64, xs: 0 },
          right: { md: 'unset', xs: 0 },
          alignItems: 'center',
        }}
      >
        {isClient &&
          (data?.data.status === 'inactive' ? (
            <Stack
              alignItems="center"
              gap={2}
              sx={{
                borderRadius: 1.5,
                bgcolor: 'dark.1',
                border: '1.5px solid',
                borderColor: 'dark.3',
                px: 4,
                py: 2,
                boxShadow: '0px 40px 80px 0px rgba(7, 7, 32, 0.40)',
                backdropFilter: 'blur(6px)',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  background:
                    'linear-gradient(90deg, #14162E 0%, rgba(255, 64, 157, 0.14) 49.64%, #14162E 100%)',
                  backdropFilter: 'blur(24px)',
                  height: '1px',
                  width: '118px',
                  top: -1,
                }}
              />
              <Icon name="TimeIcon" />
              <Typography textAlign="center" variant="p1-medium" textTransform="uppercase">
                {data.data.message}
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  background:
                    'linear-gradient(90deg, #14162E 0%, rgba(86, 92, 228, 0.14) 49.64%, #14162E 100%)',
                  backdropFilter: 'blur(24px)',
                  height: '1px',
                  width: '118px',
                  bottom: -1,
                }}
              />
            </Stack>
          ) : (
            <FlipClockCountdown
              to={new Date(toNumber(data?.data.timestampUnix) * 1000)}
              labelStyle={{ fontSize: 0 }}
              renderMap={[true, true, true, true]}
              onComplete={() => {
                setFinishedCountdown(true);
              }}
              digitBlockStyle={{
                width: 32,
                height: 48,
                fontSize: 32,
                fontWeight: 500,
                borderRadius: '6px',
                backgroundColor: '#565CE4',
              }}
              separatorStyle={{ size: 0 }}
              dividerStyle={{ color: '#4348AF', height: 1 }}
              spacing={{ clock: '8px', digitBlock: '4px' }}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default DropZone;
