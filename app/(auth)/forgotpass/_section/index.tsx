'use client';
import type { FC } from 'react';
import ForgotPass from './ForgotPass';

import ResetPass from './ResetPass';
import { useAppSelector } from '@/lib/hooks';
import { getForgotPasswordStep } from '@/lib/features/auth/authSlice';
import EmailConfirm from '@app-components/EmailConfirm';
import TwoFAConfirm from '@auth/login/_section/TwoFAConfirm';

const ForgotPassHandler = {
  1: <ForgotPass />,
  2: <EmailConfirm />,
  3: <ResetPass />,
  4: <TwoFAConfirm />,
};

const ForgotPassSection: FC = () => {
  const forgotPasswordStep = useAppSelector(getForgotPasswordStep);
  return <>{ForgotPassHandler[forgotPasswordStep as keyof typeof ForgotPassHandler]}</>;
};
export default ForgotPassSection;
