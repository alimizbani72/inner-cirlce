import { useIsMobile } from '@/hooks/use-responsive';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
const levels = [
  { baseColor: '#111229', highlightColor: '#FF3D3D', label: 'very_strong_sell' },
  { baseColor: '#14162E', highlightColor: '#F96110', label: 'strong_sell' },
  { baseColor: '#252740', highlightColor: '#E98A17', label: 'sell' },
  { baseColor: '#42435D', highlightColor: '#F7C31A', label: 'neutral' },
  { baseColor: '#5A5A72', highlightColor: '#79B303', label: 'buy' },
  { baseColor: '#7A7C97', highlightColor: '#03B375', label: 'strong_buy' },
  { baseColor: '#9799B4', highlightColor: '#04AEAE', label: 'very_strong_buy' },
];
type Props = {
  signal: string | undefined;
};

const getBorderRadius = (index: number) => {
  if (index === 0) {
    return '4px 0 0 4px';
  } else if (index === levels.length - 1) {
    return '0 4px 4px 0';
  } else {
    return 0;
  }
};

const Entry = ({ signal }: Props) => {
  const isMobile = useIsMobile();
  const activeIndex = levels.findIndex((level) => level.label === signal);
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={1}
      alignItems={isMobile ? 'start' : 'center'}
    >
      <Typography
        color={'grey.light'}
        whiteSpace={'pre'}
        variant={'p1-semi-bold'}
        textTransform={'uppercase'}
      >
        E/E Signal:
      </Typography>
      <Stack direction="row" spacing={0.1} alignItems="center">
        {levels.map((level, index) => {
          const isActive = index === activeIndex;
          const displayColor = isActive ? level.highlightColor : level.baseColor;
          return (
            <Box
              key={index}
              sx={{
                width: isActive ? { xs: '170px', md: '144px' } : '16px',
                height: '32px',
                bgcolor: displayColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: getBorderRadius(index),
              }}
            >
              {isActive && (
                <Typography variant={'caption-semi-bold'} color="white" textTransform={'uppercase'}>
                  {level.label.replace(/_/g, ' ')}
                </Typography>
              )}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Entry;
