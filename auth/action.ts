'use client';

import { AXIOS_INSTANCE } from '@/scripts/fetcher';
import type { PostAuthLogin200AllOf } from '@/services/minecraft/minecraftAPI.schemas';
import { AUTH_ROUTES_API } from './constant';
import { setAuthCookie } from './utils';

export type SignInParams = {
  email: string;
  password: string;
  otp?: string;
  push: (href: string) => void;
  callback?: VoidFunction;
};

export type SignUpParams = {
  email: string;
  password: string;
  full_name: string;
  otp?: string;
  policy_approved?: boolean;
  push: (href: string) => void;
};

export type GoogleParams = {
  token: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signIn = async ({
  email,
  password,
  otp,
  callback,
  push,
}: SignInParams): Promise<void> => {
  try {
    const params = { email, password, otp };

    const res = await AXIOS_INSTANCE.post(AUTH_ROUTES_API.login, params);

    const { data: accessToken, meta } = res.data as PostAuthLogin200AllOf;

    if (accessToken) {
      setAuthCookie(accessToken);
      push('/dashboard');
    } else if (meta?.has_2fa) {
      callback?.();
    }
  } catch (error) {
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  full_name,
  otp,
  push,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    full_name,
    otp,
  };

  try {
    const res = await AXIOS_INSTANCE.post(AUTH_ROUTES_API.register, params);

    const { data: accessToken } = res.data;

    if (accessToken) {
      setAuthCookie(accessToken);
      push('/dashboard');
    }
  } catch (error) {
    throw error;
  }
};

/** **************************************
 * Google sign in
 *************************************** */
export const signInGoogle = async ({ token }: GoogleParams): Promise<void> => {
  const params = {
    token,
  };

  try {
    const res = await AXIOS_INSTANCE.post(AUTH_ROUTES_API.google, params);

    const { data: accessToken } = res.data;
    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setAuthCookie(accessToken);
  } catch (error) {
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setAuthCookie(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
