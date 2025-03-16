import { Stack, Typography } from '@mui/material';
import numeral from 'numeral';
type Props = {
  value: any;
  symbol: string;
};
const ValueWithSymbol = ({ symbol, value }: Props) => {
  return (
    <Stack direction={'row'} spacing={0.5}>
      <Typography variant="p2-regular">
        {Math.abs(value) >= 1 ? numeral(value).format('0,0.00') : value}
      </Typography>
      <Typography variant="p2-regular">{symbol}</Typography>
    </Stack>
  );
};

export default ValueWithSymbol;
