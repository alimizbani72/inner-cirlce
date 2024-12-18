"use client";
import { mapApiDataToPlans } from "@/lib/features/plans/plansSlice";
import { useAppDispatch } from "@/lib/hooks";
import { usePackagesServiceGetPackages } from "@cms/queries";
import { type FC, type PropsWithChildren, useCallback } from "react";

const SliceWrapper: FC<PropsWithChildren> = () => {
  const dispatch = useAppDispatch();

  const handleRedux = useCallback((data: any) => {
    dispatch(mapApiDataToPlans(data));
  }, []);

  usePackagesServiceGetPackages(
    {
      locale: "en",
      where:
        process.env.NEXT_PUBLIC_ENV === "PRODUCTION"
          ? {
              status: {
                equals: "published",
              },
            }
          : undefined,
    },
    undefined,
    {
      select: (res) => {
        handleRedux(res.docs);
        return res;
      },
    }
  );

  return null;
};

export default SliceWrapper;
