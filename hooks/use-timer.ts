import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  expiryTimestamp: number;
  onExpire?: () => void;
}

function useTimer({ expiryTimestamp, onExpire }: UseTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(expiryTimestamp);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [expiryTimestamp]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    setTotalSeconds(expiryTimestamp);
    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const restart = (newExpiryTimestamp: number) => {
    setTotalSeconds(newExpiryTimestamp);
    startTimer();
  };

  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    restart,
    totalSeconds,
  };
}

export default useTimer;
