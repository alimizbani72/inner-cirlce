import type React from 'react';
import { Typography } from '@mui/material';

interface StatusTypographyProps {
  status: string;
  children: React.ReactNode;
}

export const statusColors = {
  'In Progress': 'warning.main',
  Planned: 'pink.dark',
  Completed: 'success.main',
  Future: 'pink.dark',
};

const Status = ({ status, children }: StatusTypographyProps) => {
  const color = statusColors[status as keyof typeof statusColors];

  return (
    <Typography sx={{ color, textTransform: 'capitalize' }} variant="caption-medium">
      {children}
    </Typography>
  );
};

export default Status;
