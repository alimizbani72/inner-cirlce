import {
  selectTwoFASubmitterOpen,
  selectTwoFASubmitterOTP,
  twoFASubmitterOpen,
  twoFASubmitterClearOTP,
} from '@/lib/features/two-fa-submitter/twoFASubmitterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';

type PendingFunc = (otp: string) => void;

const useOTP = () => {
  const dispatch = useAppDispatch();
  const otp = useAppSelector(selectTwoFASubmitterOTP);
  const isOpen = useAppSelector(selectTwoFASubmitterOpen);
  const [pendingFunc, setPendingFunc] = useState<PendingFunc | null>(null);

  const openModal = () => {
    dispatch(twoFASubmitterOpen());
  };

  const serviceHandler = (func: PendingFunc) => {
    setPendingFunc(() => func);
    openModal();
  };

  useEffect(() => {
    if (!isOpen && otp?.length === 6 && pendingFunc) {
      dispatch(twoFASubmitterClearOTP());
      pendingFunc(otp);
      setPendingFunc(null);
    }
  }, [isOpen, otp, pendingFunc, dispatch]);

  return { openModal, serviceHandler };
};

export default useOTP;
