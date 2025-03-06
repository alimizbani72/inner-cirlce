import { useTranslate } from '@/locales';
import { Stack, Typography } from '@mui/material';
import numeral from 'numeral';

type Props = {
  title: string;
  value: any;
  hasCalculation?: boolean;
  subtitle?: string | null;
  symbol?: string;
  currency?: string;
};

const CardItem = ({ title, value, hasCalculation, subtitle, symbol, currency }: Props) => {
  const { t } = useTranslate();
  return (
    <Stack
      sx={{ p: 3, bgcolor: 'dark.3', width: '100%', height: { xs: '160px', md: '192px' } }}
      justifyContent={'space-between'}
    >
      <Stack>
        <Typography variant="p2-medium" color={'grey.light'}>
          {title}
        </Typography>
        <Typography variant="h3-bold">
          {currency && currency}
          {value > 0.01 ? numeral(value).format('0,0.00') : value}
          {symbol && symbol}
        </Typography>
      </Stack>
      {hasCalculation ? (
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="p2-regular" color="grey.light" mr={'auto'}>
            {t('coinReportSingleView.recommended')}
          </Typography>
          <Typography variant="p2-semi-bold">100%</Typography>
        </Stack>
      ) : (
        <Typography variant="p2-regular" color="grey.light">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default CardItem;
