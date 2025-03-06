import { Typography } from '@mui/material';
import type React from 'react';
import { parseToNumber } from '../../_section/utils';

interface DistributionProps {
  value: any;
}

const Distribution: React.FC<DistributionProps> = ({ value }) => {
  const parsedValue = parseToNumber(value);
  const displayValue = Math.abs(parsedValue) < 0.01 ? 0 : parsedValue;

  let color = 'success.main';

  if (displayValue === 0) {
    color = 'white';
  } else if (displayValue < 0) {
    color = 'error.main';
  }

  return (
    <Typography variant="p2-medium" color={color}>
      {displayValue.toFixed(2)}%
    </Typography>
  );
};

export default Distribution;
