import Icon from '@/components/icon';
import type { IconNames } from '@/components/icon/types';
import { Stack, Typography } from '@mui/material';

type ActionItemProps = {
  iconName: IconNames;
  label: string;
  onClick?: () => void;
};

const ActionItem = ({ iconName, label, onClick }: ActionItemProps) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      width={'100%'}
      spacing={1}
      onClick={onClick}
      sx={{ cursor: 'pointer' }}
    >
      <Icon name={iconName} stroke="grey.light" />

      <Typography variant="p2-medium">{label}</Typography>
    </Stack>
  );
};

export default ActionItem;
