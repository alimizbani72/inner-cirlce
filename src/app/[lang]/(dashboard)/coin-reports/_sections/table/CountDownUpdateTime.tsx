import { useTranslate } from "@/locales";
import { TOTAL_SECONDS } from "@dashboard/coin-reports/_sections/consts";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCallback } from "react";
import { useTimer } from "react-timer-hook";

interface CountDownUpdateTimeProps {
  updateTime?: number;
  onNextUpdate: () => void;
}

const CountDownUpdateTime = ({ updateTime = 0, onNextUpdate }: CountDownUpdateTimeProps) => {
  const { t } = useTranslate();

  const getTimer = useCallback(() => {
    const now = new Date();
    const expire = new Date(now.getTime() + updateTime * 1000);
    return expire;
  }, [updateTime]);

  const { minutes, seconds, hours, restart } = useTimer({
    expiryTimestamp: getTimer(),
    autoStart: true,
    onExpire: () => {
      onNextUpdate?.();
      setTimeout(() => {
        const now = new Date();
        const expire = new Date(now.getTime() + TOTAL_SECONDS * 1000);
        restart(expire, true);
      }, 3000);
    },
  });

  const formatTime = (time: number) => String(time).padStart(2, "0");

  const progress = updateTime ? ((TOTAL_SECONDS - updateTime) / TOTAL_SECONDS) * 100 : 0;

  return (
    <Box display="flex" alignItems="center">
      <Box position="relative">
        <CircularProgress
          size={20}
          variant="determinate"
          value={100}
          sx={{ color: "dark.3", position: "absolute", left: 0 }}
          thickness={6}
        />
        <CircularProgress size={20} variant="determinate" value={progress} color="success" thickness={4} />
      </Box>
      <Typography variant="caption-medium" color="grey.light" ml={1}>
        {t("coinReportTable.nextUpdateIn")}
      </Typography>
      <Typography variant="caption-medium" ml={0.5}>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </Typography>
    </Box>
  );
};

export default CountDownUpdateTime;
