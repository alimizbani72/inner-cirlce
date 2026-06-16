// 'use client';
// import type { FC } from 'react';
// // import Register from './Register';
// import { useAppSelector } from '@/lib/hooks';
// import { getRegisterStep } from '@/lib/features/auth/authSlice';
// import EmailConfirm from '@app-components/EmailConfirm';

// const registerHandler = {
//   1: <Register />,
//   2: <EmailConfirm />,
// };

// const RegisterSection: FC = () => {
//   const registerStep = useAppSelector(getRegisterStep);
//   return <>{registerHandler[registerStep as keyof typeof registerHandler]}</>;
// };
// export default RegisterSection;
