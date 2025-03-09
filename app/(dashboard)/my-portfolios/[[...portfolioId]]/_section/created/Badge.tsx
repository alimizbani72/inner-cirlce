import { Box, Stack, Typography } from '@mui/material';
import numeral from 'numeral';
import { useMemo } from 'react';
type Props = {
  value: string;
  label: string;
  customColor?: string;
  isLoading: boolean;
  prefixValue?: string;
};
const Badge = ({ label, value, customColor, isLoading, prefixValue = '' }: Props) => {
  const numericValue = parseFloat(value as string);
  const color = useMemo(() => {
    if (numericValue === 0) {
      return 'white';
    } else if (numericValue < 0) {
      return 'error.main';
    } else {
      return 'success.main';
    }
  }, [numericValue]);

  return (
    <Stack
      sx={{ bgcolor: 'dark.3', borderRadius: 2.5, px: 2, py: 1, width: 'auto' }}
      direction={'row'}
      justifyContent={{ xs: 'space-between', md: undefined }}
      spacing={1}
    >
      <Typography
        variant="p2-medium"
        color={'grey.light'}
        textTransform={'uppercase'}
        whiteSpace={'nowrap'}
      >
        {label}
      </Typography>
      <Typography variant="p2-medium" color={customColor ? customColor : color}>
        {isLoading ? (
          <Box className="loading-skeleton" width={50} height={24} />
        ) : (
          `${prefixValue}${numeral(value).format('0,0.00')}`
        )}
      </Typography>
    </Stack>
  );
};

export default Badge;
