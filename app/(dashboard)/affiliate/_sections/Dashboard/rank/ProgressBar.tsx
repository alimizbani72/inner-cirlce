import { Stack } from '@mui/material';

const ProgressBar = ({ overall, percent }: { overall?: boolean; percent: number }) => (
  <Stack
    sx={{
      flex: 9 / 10,
      backdropFilter: 'blur(12px)',
      bgcolor: 'rgba(255, 255, 255, 0.04)',
      borderRadius: '2px',
      width: '100%',
      height: overall ? 8 : 4,
    }}
  >
    <Stack
      sx={{
        position: 'absolute',
        background: overall
          ? 'linear-gradient(90deg, #00B171 0%, #FFF 100%)'
          : 'linear-gradient(90deg, #565CE4 0%, #FFF 100%)',
        borderRadius: '2px',
        height: overall ? 8 : 4,
        width: `${percent}%`,
      }}
    />
  </Stack>
);
export default ProgressBar;
