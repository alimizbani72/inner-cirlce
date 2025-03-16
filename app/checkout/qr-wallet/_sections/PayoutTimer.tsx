'use client';

import RiveComp from '@/components/rive-loader';
import useTimer from '@/hooks/use-timer';
import { useTranslate } from '@/locales';
import { Stack, Typography } from '@mui/material';
import { type FC, useEffect, useMemo, useState } from 'react';

// TODO : check and refactor

const HALF_TIME_SECONDS = 1800;

type PayoutTimerProps = {
  duration: number;
  isLoading: boolean;
};

const PayoutTimer: FC<PayoutTimerProps> = ({ duration, isLoading }) => {
  const { t } = useTranslate();
  const [isExpired, setIsExpired] = useState(false);
  const [riveInput, setRiveInput] = useState<any>(null);
  const expiryTimestamp = useMemo(() => {
    if (duration && duration > 0) {
      return duration;
    }
    return 0;
  }, [duration]);
  //  Initialize the timer only when we have a valid expiryTimestamp
  const { minutes, seconds, totalSeconds, restart } = useTimer({
    expiryTimestamp: expiryTimestamp,
    onExpire: () => {
      setIsExpired(true);
    },
  });
  const countdownValue = duration > 0 ? 60 - (totalSeconds / HALF_TIME_SECONDS) * 60 : 61;

  useEffect(() => {
    if (expiryTimestamp && !totalSeconds) {
      restart(expiryTimestamp);
      setIsExpired(false);
    }
  }, [expiryTimestamp, totalSeconds]);

  useEffect(() => {
    if (riveInput) {
      riveInput.value = countdownValue;
    }
  }, [riveInput, countdownValue]);

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }} spacing={1}>
      {!isLoading && (
        <RiveComp
          src="/assets/rive/hourglass.riv"
          height={48}
          width={48}
          inputName="Count down"
          onInputReady={setRiveInput}
        />
      )}

      {!isLoading && isExpired ? (
        <Typography color="danger.main" variant="p2-medium" textTransform={'uppercase'}>
          {t('checkout.expired')}
        </Typography>
      ) : (
        <>
          <Typography variant="caption-medium" color="grey.light" textTransform={'uppercase'}>
            {t('checkout.expiredAt')}
          </Typography>
          <Stack direction="row" gap={1}>
            <Typography variant="p1-medium">{`${minutes?.toString()?.padStart(2, '0')}:${seconds
              ?.toString()
              ?.padStart(2, '0')}`}</Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default PayoutTimer;
