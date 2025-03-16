import { Stack, type StackProps } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const LandingContainer: FC<StackProps & PropsWithChildren> = ({ children, ...props }) => {
  return (
    <Stack maxWidth={1168} width="100%" px={3} {...props}>
      {children}
    </Stack>
  );
};

export default LandingContainer;
