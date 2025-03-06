'use client';
import LogoType from '@/components/LogoType';

import { useIsMobile } from '@/hooks/use-responsive';
import { Button, Stack } from '@mui/material';
import type { FC } from 'react';
import LandingContainer from './LandingContainer';

import { useTranslate } from '@/locales';
import Link from '@/components/link';
import Icon from '@/components/icon';

interface HeaderProps {
  isLogin: boolean;
}

const Header: FC<HeaderProps> = ({ isLogin }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();

  return (
    <Stack
      sx={{ borderBottom: '1px solid', borderColor: 'dark.3' }}
      component={'header'}
      zIndex={1000}
      position={'relative'}
      alignItems={'center'}
    >
      {isMobile ? (
        <Stack
          px={3}
          pt={6}
          pb={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Link href="/" style={{ height: 40 }}>
            <LogoType />
          </Link>
          {isLogin ? (
            <Button
              sx={{ ml: 'auto' }}
              color="tertiary"
              startIcon={<Icon name="UserIcon" />}
              href="/dashboard"
            >
              {t('sidebar.dashboard')}
            </Button>
          ) : (
            <Button sx={{ ml: 'auto' }} color="tertiary" href="/login">
              {t('login.loginButton')}
            </Button>
          )}
        </Stack>
      ) : (
        <LandingContainer direction={'row'} alignItems="center" gap={5} sx={{ px: 3, py: 4 }}>
          <Link href="/">
            <LogoType />
          </Link>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <circle cx="4" cy="4" r="4" fill="#14162E" />
          </svg>

          {isLogin ? (
            <Button
              sx={{ ml: 'auto' }}
              color="tertiary"
              startIcon={<Icon name="UserIcon" />}
              href="/dashboard"
            >
              {t('sidebar.dashboard')}
            </Button>
          ) : (
            <Stack sx={{ ml: 'auto' }} direction={'row'} gap={1}>
              <Button color="tertiary" href="/login">
                {t('login.loginButton')}
              </Button>
              <Button href="/register">{t('global.joinChainMind')}</Button>
            </Stack>
          )}
        </LandingContainer>
      )}
    </Stack>
  );
};

export default Header;
