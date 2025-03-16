import { Typography } from '@mui/material';
import type React from 'react';
import numeral from 'numeral';

interface ColoredTypographyProps {
  value: any;
  customColor?: string;
}

const ColoredTypography: React.FC<ColoredTypographyProps> = ({ value, customColor }) => {
  let color = 'success.main';

  if (Math.abs(value) === 0) {
    color = 'white';
  } else if (value < 0) {
    color = 'error.main';
  }

  const formattedValue = Math.abs(value) < 1 ? value : numeral(value).format('0,0.00');
  return (
    <Typography variant="p2-medium" color={customColor ? customColor : color} whiteSpace={'pre'}>
      ${formattedValue}
    </Typography>
  );
};

export default ColoredTypography;
