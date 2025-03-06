import { TableCell, Stack, Typography } from '@mui/material';
import numeral from 'numeral';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import type React from 'react';
import usePortfolioData from '../../_section/hook/usePortfolioData';

type TotalRowProps = {
  item: any;
  index: number;
};

const TotalRow: React.FC<TotalRowProps> = ({ item, index }) => {
  const { selectedPortfolio } = usePortfolioData();
  const { total_invested, total_realized, total_unrealized, total_actual_value } =
    selectedPortfolio?.data as any;
  const isMobile = useIsMobile();
  const { t } = useTranslate();

  const fieldMapping: Record<string, number> = {
    total_invested,
    realized_pnl: total_realized,
    unrealized_pnl: total_unrealized,
    actual_value: total_actual_value,
  };

  const totalValue = fieldMapping[item.field];

  const colorFullFields = ['realized_pnl', 'actual_value', 'unrealized_pnl'];
  let color = 'white';

  if (colorFullFields.includes(item.field)) {
    if (Math.abs(totalValue) === 0) {
      color = 'white';
    } else if (totalValue < 0) {
      color = 'error.main';
    } else {
      color = 'success.main';
    }
  }

  if (item.field === 'name') {
    return (
      <TableCell key={index}>
        <Stack width={'100%'} pl={1} pb={3}>
          <Typography variant="p2-medium" color={'grey.light'} textTransform={'uppercase'}>
            {isMobile ? t('assetsTable.total') : t('assetsTable.assetsTotalValue')}
          </Typography>
        </Stack>
      </TableCell>
    );
  }

  if (totalValue !== undefined) {
    return (
      <TableCell key={index}>
        <Stack width={'100%'} pb={3}>
          <Typography variant="p2-medium" color={color}>
            ${numeral(totalValue).format('0,0.00')}
          </Typography>
        </Stack>
      </TableCell>
    );
  }

  return <TableCell key={index} />;
};

export default TotalRow;
