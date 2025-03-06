import { Typography } from '@mui/material';
import { packageOptions } from '../../consts';
import { Image } from '@/components/image';
import Icon from '@/components/icon';

interface PackageHandlerProps {
  plan: string;
  name: string;
}

const PackageHandler = ({ name, plan }: PackageHandlerProps) => {
  return (
    <Typography variant="p2-medium" display="flex" alignItems="center">
      <Image
        src={packageOptions?.find((pack) => pack.value === plan)?.img}
        sx={{ width: 24, height: 24 }}
        alt={plan}
      />{' '}
      {!name && <Icon name="LockIcon" />}
    </Typography>
  );
};

export default PackageHandler;
