import { Stack, Typography } from '@mui/material';
type Props = {
  label: string;
  value: string;
  hascurrency?: boolean;
};
const TransactionDetail = ({ label, value, hascurrency }: Props) => (
  <Stack direction={'row'} spacing={0.5}>
    <Typography variant="caption-medium" color={'grey.light'} textTransform={'uppercase'}>
      {hascurrency && '$'}
      {label}
    </Typography>
    <Typography variant="caption-medium">{value}</Typography>
  </Stack>
);

export default TransactionDetail;
