"use client";

import type { FC } from "react";
import TwoFASubmitterDialog from "./Dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectTwoFASubmitterOpen, twoFASubmitterClose } from "@/lib/features/two-fa-submitter/twoFASubmitterSlice";

interface TwoFASubmitterProps {}

const TwoFASubmitter: FC<TwoFASubmitterProps> = () => {
  const isOpen = useAppSelector(selectTwoFASubmitterOpen);
  const dispatch = useAppDispatch();

  return <>{isOpen && <TwoFASubmitterDialog open={isOpen} close={() => dispatch(twoFASubmitterClose())} />}</>;
};

export default TwoFASubmitter;
