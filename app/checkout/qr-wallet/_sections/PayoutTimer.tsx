'use client';

import RiveComp from '@/components/rive-loader';
import { useTranslate } from '@/locales';
import { Stack, Typography } from '@mui/material';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useTimer } from 'react-timer-hook';

// TODO : check and refactor

type PayoutTimerProps = {
  duration: number;
};

const PayoutTimer: FC<PayoutTimerProps> = ({ duration }) => {
  const { t } = useTranslate();
  const [isExpired, setIsExpired] = useState(false);
  const [riveInput, setRiveInput] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const expiryTimestamp = useMemo(() => {
    if (duration && duration > 0) {
      const now = new Date();
      return new Date(now.getTime() + duration * 1000);
    }
    return null;
  }, [duration]);

  //  Initialize the timer only when we have a valid expiryTimestamp
  const { minutes, seconds, totalSeconds, restart } = useTimer({
    expiryTimestamp: expiryTimestamp ?? new Date(),
    autoStart: !!expiryTimestamp, // Only start if expiryTimestamp exists
    onExpire: () => {
      setIsExpired(true);
    },
  });
  const countdownValue = duration > 0 ? 61 - (totalSeconds / duration) * 60 : 61;

  useEffect(() => {
    if (expiryTimestamp) {
      restart(expiryTimestamp, true);
      setIsReady(true);
    }
  }, [expiryTimestamp, restart]);

  useEffect(() => {
    if (riveInput) {
      riveInput.value = countdownValue;
    }
  }, [riveInput, countdownValue]);

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }} spacing={1}>
      {isReady && (
        <RiveComp
          src="/assets/rive/hourglass.riv"
          height={48}
          width={48}
          inputName="Count down"
          onInputReady={setRiveInput}
        />
      )}

      {isExpired ? (
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
