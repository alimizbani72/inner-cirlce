import RiveLoader from '@/components/rive-loader/RiveLoader';
import { Box, Stack, type StackProps, Typography } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

type AnimalCardProps = StackProps & {
  src: string;
  name: string;
};

const AnimalCard: FC<PropsWithChildren<AnimalCardProps>> = ({ src, sx, name, children }) => {
  return (
    <Stack
      sx={{
        bgcolor: 'dark.1',
        textAlign: 'center',
        borderRadius: '18px',
        width: '27%',
        position: 'relative',
        ...sx,
      }}
    >
      <Box sx={{ aspectRatio: 1 }}>
        <RiveLoader src={src} />
      </Box>
      {children}

      <Typography variant="p1-semi-bold" sx={{ display: 'block', mb: 3 }}>
        {name}
      </Typography>
    </Stack>
  );
};
export default AnimalCard;
