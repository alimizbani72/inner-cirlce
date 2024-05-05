// @mui
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { MotionProps } from 'framer-motion';
import { m } from 'framer-motion';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';

//
import { varContainer } from './variants';
import type { ReactNode } from 'react';

// ----------------------------------------------------------------------

type IProps = BoxProps & MotionProps;

interface Props extends IProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({ children, disableAnimatedMobile = true, ...other }: Props) {
  const smDown = useResponsive('down', 'sm');

  if (smDown && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
