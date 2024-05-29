"use client";
import type { FC } from "react";
import ForgotPass from "./ForgotPass";
import EmailConfirm from "@app/_components/EmailConfirm";
import ResetPass from "./ResetPass";
import { useAppSelector } from "@/lib/hooks";
import { getForgotPasswordStep } from "@/lib/features/auth/authSlice";

const ForgotPassHandler = {
  1: <ForgotPass />,
  2: <EmailConfirm />,
  3: <ResetPass />,
};

const ForgotPassSection: FC = () => {
  const forgotPasswordStep = useAppSelector(getForgotPasswordStep);
  return <>{ForgotPassHandler[forgotPasswordStep as keyof typeof ForgotPassHandler]}</>;
};
export default ForgotPassSection;
