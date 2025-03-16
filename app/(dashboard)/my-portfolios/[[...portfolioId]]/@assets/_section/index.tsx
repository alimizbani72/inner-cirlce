'use client';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { formatTitle } from '@/utils/toNumber';
import { Stack } from '@mui/material';
import numeral from 'numeral';
import usePortfolioData from '../../_section/hook/usePortfolioData';
import ColoredTypography from './ColoredTypography';
import CustomAssetTable from './CustomAssetTable';
import Distribution from './Distribution';
import MoreTableAction from './MoreTableAction';
import ValueWithSymbol from './ValueWithSymbol';
import CryptoIcon from '@app-components/CryptoIcon';
import Icon from '@/components/icon';
import { Scrollbar } from '@/components/scrollbar';
import { useGetPortfolios } from '@/services/minecraft/portfolio/portfolio';
import type { PortfolioHttpAssetResponse } from '@/services/minecraft/minecraftAPI.schemas';

interface RowType extends PortfolioHttpAssetResponse {
  onClick: () => void;
  isOpen?: boolean;
}

const AssetsTable = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const { data: portfolios } = useGetPortfolios();
  const { portfolioId, selectedPortfolio, isLoading } = usePortfolioData();

  const columns = [
    {
      title: t('assetsTable.name'),
      field: 'name',
      modify: (row: RowType) => (
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={row.onClick}
          gap={1}
        >
          {portfolioId && <MoreTableAction slug={row?.slug || ''} />}
          <Stack
            direction={'row'}
            sx={{ width: '100%' }}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={1}
          >
            <CryptoIcon
              name={row?.name || ''}
              symbol={row?.symbol || ''}
              logoUrl={row?.logo || ''}
            />
            {portfolioId && (
              <Stack>
                <Icon
                  name={row.isOpen ? 'ThickarrowupIcon' : 'ThickarrowdownIcon'}
                  fill={row.isOpen ? 'common.white' : 'grey.dark'}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      ),
    },
    {
      title: t('assetsTable.currentHoldings'),
      field: 'current_holdings',
      modify: (row: RowType) => (
        <ValueWithSymbol value={row?.current_holdings} symbol={row?.symbol || ''} />
      ),
    },
    {
      title: formatTitle(t('assetsTable.actualPrice')),
      field: 'actual_price',
      modify: (row: RowType) => <ColoredTypography value={row?.actual_price} customColor="white" />,
    },
    {
      title: formatTitle(t('assetsTable.actualValue')),
      field: 'actual_value',
      modify: (row: RowType) => <ColoredTypography value={row?.actual_value} />,
    },

    {
      title: formatTitle(t('assetsTable.distribution'), '%'),
      field: 'distribution',
      modify: (row: RowType) => <Distribution value={row?.distribution} />,
    },
    {
      title: t('assetsTable.totalBought'),
      field: 'total_purchased',
      modify: (row: RowType) => (
        <ValueWithSymbol value={row?.total_purchased} symbol={row?.symbol || ''} />
      ),
    },
    {
      title: t('assetsTable.totalSold'),
      field: 'total_sold',
      modify: (row: RowType) => (
        <ValueWithSymbol value={row?.total_sold} symbol={row?.symbol || ''} />
      ),
    },
    {
      title: formatTitle(t('assetsTable.totalInvest')),
      field: 'total_invested',
      modify: (row: RowType) => `$${numeral(row?.total_invested).format('0,0.00')}`,
    },
    {
      title: formatTitle(t('assetsTable.unrealizedpnl')),
      field: 'unrealized_pnl',
      modify: (row: RowType) => <ColoredTypography value={row?.unrealized_pnl} />,
    },
    {
      title: formatTitle(t('assetsTable.realizedPNL')),
      field: 'realized_pnl',
      modify: (row: RowType) => <ColoredTypography value={row?.realized_pnl} />,
    },
  ];
  if (!portfolios?.data?.length) {
    return null;
  }
  return (
    <Stack px={{ xs: 0, md: 4 }} pb={5}>
      <Scrollbar
        sx={{
          maxWidth: '100%',
        }}
      >
        <Stack
          alignItems="flex-start"
          sx={{
            ...(!isMobile
              ? {}
              : {
                  '> div': {
                    borderRadius: 0,
                    borderRight: 0,
                    borderLeft: 0,
                  },
                }),
          }}
        >
          <CustomAssetTable
            isPending={isLoading}
            minWidthCell={160}
            title={t('assetsTable.assets')}
            columns={columns}
            data={((selectedPortfolio?.data as any)?.assets as any) ?? []}
          />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AssetsTable;
