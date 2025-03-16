import { useResponsive } from '@/hooks/use-responsive';
import useTimer from '@/hooks/use-timer';
import { useTranslate } from '@/locales';
import { TOTAL_SECONDS } from '@dashboard/coin-reports/_sections/consts';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

interface CountDownUpdateTimeProps {
  onNextUpdate: () => void;
  timeSeconds: number;
}

const CountDownUpdateTime = ({ onNextUpdate, timeSeconds }: CountDownUpdateTimeProps) => {
  const { t } = useTranslate();
  const isLarge = useResponsive('up', 'lg');

  const { minutes, seconds, totalSeconds } = useTimer({
    expiryTimestamp: timeSeconds,
    onExpire: async () => {
      await onNextUpdate?.();
    },
  });

  const formatTime = (time: number) => String(time).padStart(2, '0');

  const progress = totalSeconds ? ((TOTAL_SECONDS - totalSeconds) / TOTAL_SECONDS) * 100 : 0;

  return (
    <Stack direction={'row'} alignItems="center">
      <Box position="relative" sx={{ height: 20 }}>
        <CircularProgress
          size={20}
          variant="determinate"
          value={100}
          sx={{ color: 'dark.3', position: 'absolute', left: 0 }}
          thickness={6}
        />
        <CircularProgress
          size={20}
          variant="determinate"
          value={progress}
          color="success"
          thickness={4}
        />
      </Box>
      {isLarge && (
        <Typography variant="caption-medium" color="grey.light" ml={1}>
          {t('coinReportTable.nextUpdateIn')}
        </Typography>
      )}
      <Typography variant="caption-medium" ml={{ xs: 1, lg: 0.5 }}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </Typography>
    </Stack>
  );
};

export default CountDownUpdateTime;
