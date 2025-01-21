"use client";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { notFound } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

const KYCWrapper: FC<PropsWithChildren> = ({ children }) => {
  const userInfo = useAppSelector(selectUser);

  if (!userInfo?.kyc_status) {
    return notFound();
  }

  return <>{children}</>;
};
export default KYCWrapper;
