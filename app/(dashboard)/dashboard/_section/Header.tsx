'use client';

import LogoType from '@/components/LogoType';
import Icon from '@/components/icon';
import Link from '@/components/link';
import RiveComp from '@/components/rive-loader';
import { mapPathToName } from '@/configs/sidebar';
import { useIsMobile } from '@/hooks/use-responsive';
import { isMobileMenuOpened, mobileMenuToggle } from '@/lib/features/menu/menuSlice';
import { pageHasBackButton, pageTitle } from '@/lib/features/pageTitle/pageSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useGetAffiliateMe } from '@/services/minecraft/affiliate/affiliate';
import { normalize } from '@/utils/path';

import { toNumber } from '@/utils/toNumber';
import MobileSidebar from '@app-components/sidebar/Mobile';
import { Box, Button, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { type FC, useEffect, useMemo, useState } from 'react';

const DashboardHeader: FC = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: me, isFetching } = useGetAffiliateMe();

  const [isClient, setIsClient] = useState(false);
  const pageTitleSelector = useAppSelector(pageTitle);
  const isMenuOpened = useAppSelector(isMobileMenuOpened);
  const hasBackButton = useAppSelector(pageHasBackButton);
  const { back } = useRouter();

  const name = useMemo(() => {
    const normalizedPath = normalize(pathname.slice(1));
    const mappedKey = mapPathToName[normalizedPath as keyof typeof mapPathToName];
    return mappedKey ? t(`sidebar.${mappedKey}` as any) : pageTitleSelector || 'ChainMind';
  }, [pathname, pageTitleSelector]);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          {isClient && hasBackButton && (
            <IconButton sx={{ mr: 1 }} onClick={() => back()}>
              <Icon name="ArrowLeftIcon" />
            </IconButton>
          )}

          {isClient && <Typography variant={'h4-medium'}>{name}</Typography>}
        </Stack>
      </Stack>

      {/* Mobile menu drawer */}
      <Drawer
        open={isMenuOpened}
        variant="persistent"
        PaperProps={{ sx: { '&.MuiDrawer-paper': { bgcolor: 'dark.1' } } }}
      >
        <MobileSidebar />
      </Drawer>
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
        {isClient && hasBackButton && (
          <IconButton onClick={() => back()}>
            <Icon name="ArrowLeftIcon" />
          </IconButton>
        )}

        {isClient && <Typography variant={'p1-medium'}>{name}</Typography>}
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
