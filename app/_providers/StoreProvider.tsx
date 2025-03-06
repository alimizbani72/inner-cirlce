'use client';
import { initializeDevice } from '@/lib/features/device/deviceSlice';
import { type Dictionary, initializeDic } from '@/lib/features/dictionary/dicSlice';
import type { AppStore } from '@/lib/store';
import { makeStore } from '@/lib/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

interface Props {
  readonly children: ReactNode;
  currentLang: string;
  dict: Dictionary;
  userAgent: string | null;
}

export const StoreProvider = ({ children, currentLang, dict, userAgent }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeDic({ currentLang, dict }));
    storeRef.current.dispatch(initializeDevice(userAgent));
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
