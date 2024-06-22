"use client";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { mapApiDataToPlans } from "@/lib/features/plans/plansSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePackagesServiceGetPackages } from "@cms/queries";
import { useCallback, type FC, type PropsWithChildren } from "react";

const SliceWrapper: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch();

  const handleRedux = useCallback((data: any) => {
    dispatch(mapApiDataToPlans(data));
  }, []);

  const lang = useAppSelector(selectLang);
  usePackagesServiceGetPackages({ locale: lang }, undefined, {
    select: (res) => {
      handleRedux(res.docs);
      return res;
    },
  });

  return null;
};

export default SliceWrapper;
