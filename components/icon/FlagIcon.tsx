import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { forwardRef, useState } from 'react';

// ----------------------------------------------------------------------

export type FlagIconProps = BoxProps & {
  code?: string;
};

export const FlagIcon = forwardRef<HTMLSpanElement, FlagIconProps>(
  ({ code, sx, ...other }, ref) => {
    const [imgSrc, setImgSrc] = useState(`/assets/images/flags/${code?.toLowerCase()}.png`);

    const baseStyles: SxProps<Theme> = {
      width: 26,
      height: 20,
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: '3px',
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',

      ...(imgSrc === '/assets/images/unknown-flag.svg' && { padding: '2px' }),
    };

    if (!code) {
      return null;
    }

    return (
      <Box ref={ref} component="span" sx={{ ...baseStyles, ...sx }} {...other}>
        <Box
          component="img"
          loading="lazy"
          alt={code}
          src={imgSrc}
          onError={() => setImgSrc('/assets/images/unknown-flag.svg')}
          sx={{
            width: 1,
            height: 1,
            maxWidth: 'unset',
            objectFit: 'cover',
          }}
        />
      </Box>
    );
  }
);
