"use client";
import { useGetMe } from "@/services/minecraft/default/default";
import { notFound } from "next/navigation";

const KYCWrapper = () => {
  const { data: userInfo, isLoading } = useGetMe();

  if (isLoading) {
    return null;
  }

  if (!userInfo?.data?.kyc_status) {
    return notFound();
  }

  return null;
};
export default KYCWrapper;
