'use client';
import { Box, Stack } from '@mui/material';
import TabsItem from './TabsItem';
import { useAppRouter } from '@/routes/hooks';
import { useTranslate } from '@/locales';
import Icon from '@/components/icon';
import type { PortfolioHttpPortfolioResponse } from '@/services/minecraft/minecraftAPI.schemas';
const overviewId = 'overview';
type TabsProps = {
  portfolios: PortfolioHttpPortfolioResponse[];
  portfolioId: string | string[] | null;
  overviewtotal_actual_value: string;
};
const Tabs = ({ portfolios, portfolioId, overviewtotal_actual_value }: TabsProps) => {
  const router = useAppRouter();
  const { t } = useTranslate();
  const onSelectTab = (id: string) => {
    if ((id === overviewId && !portfolioId) || id === portfolioId) {
      return;
    }
    router.push(id === overviewId ? '/my-portfolios' : `/my-portfolios/${id}`);
  };

  return (
    <Stack direction="row" width={'100%'} spacing={1}>
      <TabsItem
        isActive={!portfolioId}
        portfolioName={t('portfolioSummary.overview')}
        portfolioAvatar={
          <Box sx={{ '& svg path': { strokeOpacity: 1 } }}>
            <Icon name="MorerectangleIcon" />
          </Box>
        }
        bgColor="dark.3"
        customAvatarbgColor={!portfolioId ? 'dark.1' : 'dark.3'}
        price={overviewtotal_actual_value}
        onClick={() => onSelectTab(overviewId)}
      />
      {portfolios.map((portfolio) => (
        <TabsItem
          key={portfolio.id}
          isActive={portfolioId === portfolio.id}
          portfolioName={portfolio.name}
          portfolioAvatar={portfolio.avatar}
          bgColor={portfolio.background_color}
          price={portfolio.actual_value!}
          onClick={() => onSelectTab(portfolio.id as string)}
        />
      ))}
    </Stack>
  );
};

export default Tabs;
