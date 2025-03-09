'use client';
import { Scrollbar } from '@/components/scrollbar';
import Toggle from '@/components/Toggle';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { Stack, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
// ----------------------------------------------------------------------

export default function AffTabs() {
  const pathname = usePathname();
  const router = useAppRouter();
  const { t } = useTranslate();

  const buttons = useMemo(
    () => [
      { label: t('affiliateSection.dashboard'), value: 'dashboard' },
      {
        label: (
          <Stack direction="row" gap={1} alignItems="center">
            {t('affiliateSection.statistics')}
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ borderRadius: 1.5, backgroundColor: 'dark.1' }}
              px={1}
              height={24}
            >
              <Typography
                variant="caption-semi-bold"
                sx={{
                  background: (theme) => theme.palette.gradient.pink,
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                }}
              >
                {t('affiliateSection.comingSoon')}
              </Typography>
            </Stack>
          </Stack>
        ),
        value: 'statistics',
      },
      { label: t('affiliateSection.network'), value: 'network' },
      { label: t('affiliateSection.commissions'), value: 'commissions' },
      { label: t('affiliateSection.payouts'), value: 'payouts' },
    ],
    [t]
  );
  const activeTab = useMemo(() => {
    const pathSegment = pathname?.split('/')?.[2] || 'dashboard';
    return pathSegment === '' ? 'dashboard' : pathSegment;
  }, [pathname]);

  return (
    <Scrollbar sx={{ maxWidth: '100%' }}>
      <Stack pl={{ md: 4, xs: 3 }} alignItems="flex-start" maxWidth="100vw">
        <Stack pr={{ md: 4, xs: 3 }}>
          <Toggle
            setValue={(value) => router.push(`/affiliate/${value === 'dashboard' ? '' : value}`)}
            buttons={buttons}
            value={activeTab}
          />
        </Stack>
      </Stack>
    </Scrollbar>
  );
}
