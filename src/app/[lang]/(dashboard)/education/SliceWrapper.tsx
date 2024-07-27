"use client";

import { fetchEducationData } from "@/lib/features/academy/educationSlice";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEducationVideosServiceGetEducationVideos } from "@cms/queries";
import { useCallback, type FC, type PropsWithChildren } from "react";

const SliceWrapper: FC<PropsWithChildren<{ userMembership: string }>> = ({ userMembership }) => {
  const dispatch = useAppDispatch();

  const handleRedux = useCallback((data: any) => {
    dispatch(fetchEducationData(data, userMembership));
  }, []);

  const lang = useAppSelector(selectLang);

  useEducationVideosServiceGetEducationVideos({ limit: 1000, locale: lang as string }, undefined, {
    select: (res) => {
      handleRedux((res as any).docs);
      return res;
    },
  });

  return null;
};

export default SliceWrapper;
