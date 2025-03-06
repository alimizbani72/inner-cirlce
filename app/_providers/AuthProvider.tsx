'use client';
import { getToken } from '@/utils/getToken';
import { RedirectType, redirect, usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
  accessToken?: string;
}
const authRoutes = [`/login`, `/register`];
const forgotPasswordRoutes = [`/forgotpass`, '/resetpass'];
const publicRoutes = [
  `/terms-and-condition`,
  `/disclaimer`,
  `/privacy-policy`,
  `/imprint`,
  `/guest`,
];
export default function AuthProvider({ children, accessToken }: AuthProviderProps) {
  const pathname = usePathname();

  const token = accessToken ?? getToken();
  if (pathname !== '/') {
    if (!token && ![...authRoutes, ...forgotPasswordRoutes, ...publicRoutes].includes(pathname)) {
      redirect('/login', RedirectType.replace);
    }

    if (token && authRoutes.includes(pathname)) {
      redirect('/dashboard', RedirectType.replace);
    }
  }

  return <>{children}</>;
}
