"use client";

import RiveComp from "@/components/RiveComp";
import { useTranslate } from "@/locales";
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import { useTimer } from "react-timer-hook";

type PayoutTimerProps = {
  duration: number;
};

const PayoutTimer: FC<PayoutTimerProps> = ({ duration }) => {
  const { t } = useTranslate();
  const [isExpired, setIsExpired] = useState(false);
  const [riveInput, setRiveInput] = useState<any>(null); // State to store the input from RiveComp

  const getTimer = useCallback(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time;
  }, [duration]);

  const { minutes, seconds, totalSeconds } = useTimer({
    expiryTimestamp: getTimer(),
    onExpire() {
      setIsExpired(true);
    },
  });

  const countdownValue = duration > 0 ? 61 - (totalSeconds / duration) * 60 : 61;

  useEffect(() => {
    if (riveInput) {
      riveInput.value = countdownValue;
    }
  }, [riveInput, countdownValue]);

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
      <RiveComp
        src="/assets/rive/hourglass.riv"
        height={48}
        width={48}
        inputName="Count down"
        onInputReady={setRiveInput}
      />
      {isExpired ? (
        <Typography color="danger.main" variant="p2-medium" textTransform={"uppercase"}>
          {t("checkout.expired")}
        </Typography>
      ) : (
        <>
          <Typography variant="caption-medium" color="grey.light" textTransform={"uppercase"} pt={1}>
            {t("checkout.expiredAt")}
          </Typography>
          <Stack direction="row" gap={1}>
            <Typography variant="p1-medium">{`${minutes?.toString()?.padStart(2, "0")}:${seconds
              ?.toString()
              ?.padStart(2, "0")}`}</Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default PayoutTimer;
