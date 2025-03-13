import { useResponsive } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { TOTAL_SECONDS } from '@dashboard/coin-reports/_sections/consts';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useTimer } from 'react-timer-hook';

interface CountDownUpdateTimeProps {
  onNextUpdate: () => void;
  timeSeconds: Date;
}

const CountDownUpdateTime = ({ onNextUpdate, timeSeconds }: CountDownUpdateTimeProps) => {
  const { t } = useTranslate();
  const isLarge = useResponsive('up', 'lg');
  // const getTimer = useCallback(() => {
  //   const now = new Date();
  //   const expire = new Date(now.getTime() + timeSeconds * 1000);
  //   return expire;
  // }, [timeSeconds]);

  const { minutes, seconds, restart, totalSeconds } = useTimer({
    expiryTimestamp: timeSeconds,
    autoStart: true,
    onExpire: async () => {
      await onNextUpdate?.();
      restart(timeSeconds, true);
      // restart(getTimer(), true);
      // setTimeout(() => {
      //   const now = new Date();
      //   const expire = new Date(now.getTime() + TOTAL_SECONDS * 1000);
      //   setTimeSeconds(TOTAL_SECONDS);
      //   restart(timeSeconds, true);
      // }, 3000);
    },
  });

  const formatTime = (time: number) => String(time).padStart(2, '0');

  const progress = totalSeconds ? ((TOTAL_SECONDS - totalSeconds) / TOTAL_SECONDS) * 100 : 0;

  // useEffect(() => {
  //   console.log('inside efect');

  //   return () => {
  //     restart(dayjs().add(timeSeconds, 'second'), true);
  //   };
  // }, [timeSeconds]);

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
