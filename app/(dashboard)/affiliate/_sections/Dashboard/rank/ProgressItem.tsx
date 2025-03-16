import { Stack, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';
type Props = {
  percent: number | undefined;
  title: string;
  overall?: boolean;
  percentVarient?: boolean;
};
const ProgressItem = ({ percent, title, overall, percentVarient }: Props) => {
  return (
    <Stack
      height={24}
      direction="row"
      alignItems={'center'}
      justifyContent="space-between"
      width={'100%'}
    >
      <Stack width={94} direction={'row'} alignItems="center">
        <Typography variant="caption-medium" mr={1} color="grey.light">
          {title}:
        </Typography>
        <Typography variant={percentVarient ? 'h4-bold' : 'p2-semi-bold'}>{percent}</Typography>
        <Typography variant="caption-semi-bold" ml="2px">
          %
        </Typography>
      </Stack>

      <ProgressBar overall={overall} percent={percent!} />
    </Stack>
  );
};

export default ProgressItem;
