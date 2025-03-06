'use client';
import type { FC } from 'react';
import Login from './Login';
import TwoFAConfirm from './TwoFAConfirm';
import { useAppSelector } from '@/lib/hooks';
import { getLoginStep } from '@/lib/features/auth/authSlice';

const loginHandler = {
  1: <Login />,
  2: <TwoFAConfirm />,
};

const LoginSection: FC = () => {
  const loginStep = useAppSelector(getLoginStep);
  return <>{loginHandler[loginStep as keyof typeof loginHandler]}</>;
};
export default LoginSection;
