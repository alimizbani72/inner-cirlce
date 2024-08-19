"use client";
import { type Dictionary, initializeDic } from "@/lib/features/dictionary/dicSlice";
import { initializeUser, type IUser } from "@/lib/features/user/userSlice";
import type { AppStore } from "@/lib/store";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
  currentLang: string;
  dict: Dictionary;
  user: IUser;
}

export const StoreProvider = ({ children, currentLang, dict, user }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeDic({ currentLang, dict }));
    if (user) {
      storeRef.current.dispatch(initializeUser(user));
    }
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
