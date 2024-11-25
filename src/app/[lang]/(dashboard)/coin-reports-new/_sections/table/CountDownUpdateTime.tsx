import { useTranslate } from "@/locales";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useCallback } from "react";
import { useTimer } from "react-timer-hook";

interface CountDownUpdateTimeProps {
  updateTime?: number;
  onNextUpdate?: () => void;
}

const CountDownUpdateTime = ({ updateTime = 0, onNextUpdate }: CountDownUpdateTimeProps) => {
  const { t } = useTranslate();

  const getTimer = useCallback(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + updateTime);
    return time;
  }, [updateTime]);

  const { minutes, seconds, hours, totalSeconds } = useTimer({
    expiryTimestamp: getTimer(),
    onExpire: onNextUpdate,
  });

  const formatTime = (time: number) => String(time).padStart(2, "0");

  const progress = updateTime ? ((updateTime - totalSeconds) / updateTime) * 100 : 0;

  return (
    <Box display="flex" alignItems="center">
      <CircularProgress size={20} variant="determinate" value={progress} color="success" />
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
