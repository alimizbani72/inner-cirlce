'use client';

import LogoType from '@/components/LogoType';
import Icon from '@/components/icon';
import Link from '@/components/link';
import RiveComp from '@/components/rive-loader';
import { useIsMobile } from '@/hooks/use-responsive';
import { mobileMenuToggle } from '@/lib/features/menu/menuSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useGetAffiliateMe } from '@/services/minecraft/affiliate/affiliate';
import { normalize, shouldShowBackButton } from '@/utils/helper';

import { toNumber } from '@/utils/toNumber';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const DashboardHeader = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: me, isFetching } = useGetAffiliateMe();
  const { back } = useRouter();
  const name = useMemo(() => {
    const normalizedPath = normalize(pathname.slice(1));
    const segments = normalizedPath.split('/').filter(Boolean);
    const firstSegment = segments[0];
    const lastSegment = segments.at(-1) ?? '';
    const mainTitle = t(`sidebar.${firstSegment}` as any) || 'ChainMind';

    if (segments.length === 1) {
      return mainTitle;
    }

    return `${mainTitle}: ${decodeURIComponent(lastSegment)}`;
  }, [pathname, t]);

  return isMobile ? (
    <>
      <Stack bgcolor={'dark.1'} position={'sticky'} top={0} zIndex={1000}>
        <Stack
          p={3}
          direction={'row'}
          alignItems={'center'}
          justifyContent="space-between"
          position="relative"
        >
          <IconButton onClick={() => dispatch(mobileMenuToggle(true))}>
            <Icon name="MenuIcon" />
          </IconButton>
          <LogoType />

          <Stack direction="row" spacing={2}>
            <Box
              position="relative"
              {...(isFetching && {
                minWidth: 30,
                minHeight: 30,
                className: 'loading-skeleton',
              })}
            >
              <Box position="absolute" left="-47px" top="-19px" sx={{ aspectRatio: 1 }}>
                <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
              </Box>
              <Typography color="common.white">
                {!isFetching ? toNumber(me?.data?.goldCoins) : ''}
              </Typography>
            </Box>

            <Link href="/telegram-channel">
              <img src="/assets/svg/telegramlogo.svg" />
            </Link>
          </Stack>

          {/* <IconButton>
            <Icon name="Bell" />
          </IconButton> */}
        </Stack>
        <Stack
          justifyContent={'flex-start'}
          alignItems={'center'}
          p={3}
          borderTop={'1.5px solid'}
          borderBottom={'1.5px solid'}
          borderColor={'dark.3'}
          direction={'row'}
        >
          {shouldShowBackButton(pathname) && (
            <IconButton sx={{ mr: 1 }} onClick={() => back()}>
              <Icon name="ArrowLeftIcon" />
            </IconButton>
          )}

          <Typography variant={'h4-medium'} textTransform={'capitalize'}>
            {name}
          </Typography>
        </Stack>
      </Stack>
    </>
  ) : (
    <Stack
      bgcolor={'dark.2'}
      p={4}
      borderBottom={'1.5px solid'}
      borderColor={'dark.3'}
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={'row'}
      height={105}
    >
      <Stack gap={1} direction={'row'}>
        {shouldShowBackButton(pathname) && (
          <IconButton onClick={() => back()}>
            <Icon name="ArrowLeftIcon" />
          </IconButton>
        )}

        <Typography variant={'p1-medium'} textTransform={'capitalize'}>
          {name}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} position={'relative'}>
        {isFetching ? (
          <Box className="loading-skeleton" width={151} height={40} borderRadius={4} />
        ) : (
          <Button
            color="tertiary"
            className={isFetching ? 'loading-skelton' : ''}
            sx={{ py: 1, pr: 2, pl: 4.5 }}
            startIcon={
              <Box position="absolute" left="-6px" top="-13px" sx={{ aspectRatio: 1 }}>
                <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
              </Box>
            }
          >
            <Typography color="grey.light" variant="p2-medium" mr={0.5}>
              {t('afDashboardTab.goldCoins')}:
            </Typography>
            {toNumber(me?.data?.goldCoins)}
          </Button>
        )}

        <Link href="/telegram-channel">
          <Button
            color="tertiary"
            sx={{ p: 1, pr: 3, pl: 1.5 }}
            startIcon={<img src="/assets/svg/telegramlogo.svg" />}
          >
            {t('sidebar.telegram-channel')}
          </Button>
        </Link>
      </Stack>
      {/* <Button color="info" startIcon={<Icon name="Bell" />}>
        Notification
      </Button> */}
    </Stack>
  );
};

export default DashboardHeader;
