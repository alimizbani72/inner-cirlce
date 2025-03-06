'use client';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import { Scrollbar } from '@/components/scrollbar';
import { isSidebarCollapsed } from '@/lib/features/menu/menuSlice';
import { useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useGetPortfolios } from '@/services/minecraft/portfolio/portfolio';
import { Stack, styled, Typography } from '@mui/material';
import { useState } from 'react';
import usePortfolioData from '../../_section/hook/usePortfolioData';
import { parseToNumber } from '../../_section/utils';
import Chart from './Chart';
import CryptoChip from './CryptoChip';

//TODO: refator this / create insider component

const ContainerStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '323.86px',
  padding: theme.spacing(3),
  backgroundColor: 'var(--palette-dark-2)',
  border: '1px solid',
  borderColor: 'var(--palette-dark-3)',
  borderRadius: '12px',
  overflow: 'hidden',
}));

const Allocation = () => {
  const { t } = useTranslate();
  const { data: portfolios } = useGetPortfolios();
  const { selectedPortfolio, isLoading } = usePortfolioData();
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null);
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const seriesData = (selectedPortfolio?.data as any)?.assets.map((asset: any) => ({
    x: asset.name,
    y: parseToNumber(asset.distribution).toFixed(2),
  }));
  if (!portfolios?.data?.length) {
    return null;
  }

  if (isLoading) {
    return (
      <ContainerStack
        maxWidth={{
          xs: 'calc(100vw - 48px)',
          md: isCollapsed ? 'calc(50vw - 97px)' : 'calc(50vw - 168px)',
        }}
      >
        <Loading sx={{ mt: 2 }} />{' '}
      </ContainerStack>
    );
  }

  return (
    <ContainerStack
      maxWidth={{
        xs: 'calc(100vw - 48px)',
        md: isCollapsed ? 'calc(50vw - 97px)' : 'calc(50vw - 168px)',
      }}
    >
      {!seriesData?.length ? (
        <Empty sx={{ mt: 2 }} />
      ) : (
        <>
          <Stack width={'100%'}>
            <Typography variant="p1-medium">{t('allocation.allocation')}</Typography>
            <Chart
              seriesData={seriesData}
              onHover={setHoveredCrypto}
              hoveredCrypto={hoveredCrypto}
            />
          </Stack>

          <Scrollbar>
            <Stack
              direction="row"
              flexWrap="wrap"
              px={{ xs: 0, md: 5 }}
              spacing={1}
              pt={{ xs: 6, md: 9 }}
              justifyContent={'center'}
              sx={{
                maxHeight: '210px',
                // "& > *": { flex: "0 0 auto" },
              }}
            >
              {(selectedPortfolio?.data as any)?.assets.map((asset: any) => (
                <CryptoChip
                  key={asset.slug}
                  label={asset.name}
                  value={asset.distribution}
                  isActive={hoveredCrypto === asset.name}
                  onHover={setHoveredCrypto}
                />
              ))}
            </Stack>
          </Scrollbar>
        </>
      )}
    </ContainerStack>
  );
};

export default Allocation;
