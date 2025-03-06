import { SvgIcon } from '@mui/material';
import type React from 'react';
import icons from './icons';
import type { IconNames } from './types';

type IconProps = {
  name: IconNames;
  fill?: string;
  stroke?: string;
  size?: number;
};

const Icon: React.FC<IconProps> = ({
  fill = 'common.white',
  stroke = 'common.white',
  size = 24,
  name,
}) => {
  const Icon = icons[name];
  const strokeColor = `var(--palette-${stroke.replace('.', '-')})`;
  const fillColor = `var(--palette-${fill.replace('.', '-')})`;
  return (
    <SvgIcon style={{ fontSize: size }}>
      <Icon fill={fillColor} stroke={strokeColor} />
    </SvgIcon>
  );
};

export default Icon;
