import Icon from '@/components/icon';
import type { IconNames } from '@/components/icon/types';
import { Stack, Typography } from '@mui/material';
type Props = {
  onClick?: VoidFunction;
  icon: IconNames;
  value: string;
};
const CustomBadge = ({ onClick, icon, value }: Props) => {
  return (
    <Stack
      onClick={onClick}
      direction={'row'}
      alignItems={'center'}
      sx={{ bgcolor: 'dark.3', borderRadius: 2.5, px: 2, py: 1, cursor: 'pointer' }}
      spacing={1}
    >
      <Icon name={icon} stroke="grey.light" />

      <Typography variant="p2-medium" sx={{ whiteSpace: 'nowrap' }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default CustomBadge;
