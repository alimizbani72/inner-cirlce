'use client';

import { fetchEducationData } from '@/lib/features/academy/educationSlice';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetEducationVideos } from '@/services/cms/education-videos/education-videos';
import { useGetMe } from '@/services/minecraft/auth/auth';
import { type FC, type PropsWithChildren, useEffect } from 'react';

const SliceWrapper: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch();
  const { data: userInfo } = useGetMe();

  const lang = useAppSelector(selectLang);

  const { data } = useGetEducationVideos({
    limit: 1000,
    locale: lang as string,
  });
  useEffect(() => {
    if (userInfo?.data?.plan_type && data) {
      dispatch(fetchEducationData((data as any)?.docs || [], userInfo?.data?.plan_type || ''));
    }
  }, [userInfo?.data?.plan_type, data]);

  return null;
};

export default SliceWrapper;
