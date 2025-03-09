import { useTranslate } from '@/locales';
import { Stack, Typography } from '@mui/material';
import Badge from './Badge';
import MorePortfolioAction from './MorePortfolioAction';
import TransactionActionButton from './TransactionActionButton';
import Icon from '@/components/icon';
import type {
  PortfolioHttpPortfolioDetailResponse,
  PortfolioHttpPortfolioResponse,
} from '@/services/minecraft/minecraftAPI.schemas';

type SelectedPortfolio = Pick<
  PortfolioHttpPortfolioDetailResponse,
  'total_unrealized' | 'total_realized' | 'total_invested'
>;
type PortfolioSummaryProps = {
  selectedPortfolio: SelectedPortfolio | undefined;
  portfolios: PortfolioHttpPortfolioResponse[];
  portfolioId: string | string[] | null;
  isLoading: boolean;
};

const PortfolioSummary = ({
  selectedPortfolio,
  portfolios,
  portfolioId,
  isLoading,
}: PortfolioSummaryProps) => {
  const { t } = useTranslate();
  const currentPortfolio = portfolios.find((portfolio) => portfolio.id === portfolioId);
  const isOverviewTab = !portfolioId;

  return (
    <Stack px={{ xs: 3, md: 4 }} pt={{ xs: 3, md: 4 }} pb={4}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: undefined, md: 'center' }}
        spacing={2}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: undefined, md: 'center' }}
          spacing={2}
          flexWrap={'wrap'}
        >
          {isOverviewTab ? (
            <Stack direction={'row'} spacing={1} sx={{ '& svg path': { strokeOpacity: 1 } }}>
              <Icon name="MorerectangleIcon" />
              <Typography variant="p2-semi-bold" whiteSpace={'nowrap'}>
                {t('portfolioSummary.overview')}
              </Typography>
            </Stack>
          ) : (
            <Stack direction={'row'} spacing={1}>
              <MorePortfolioAction portfolio={currentPortfolio as PortfolioHttpPortfolioResponse} />
              <Typography>{currentPortfolio?.avatar}</Typography>
              <Typography variant="p2-semi-bold" whiteSpace={'nowrap'}>
                {currentPortfolio?.name}
              </Typography>
            </Stack>
          )}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} flexWrap={'wrap'}>
            <Badge
              label="Total invest"
              value={`${selectedPortfolio?.total_invested!}`}
              prefixValue="$"
              customColor="white"
              isLoading={isLoading}
            />
            <Badge
              label="Realized PNL"
              value={selectedPortfolio?.total_realized!}
              isLoading={isLoading}
            />
            <Badge
              label="UNRealized PNL"
              value={selectedPortfolio?.total_unrealized!}
              isLoading={isLoading}
            />
          </Stack>
        </Stack>
        {!isOverviewTab && (
          <TransactionActionButton btnText={t('portfolioSummary.addTransaction')} />
        )}
      </Stack>
    </Stack>
  );
};

export default PortfolioSummary;
