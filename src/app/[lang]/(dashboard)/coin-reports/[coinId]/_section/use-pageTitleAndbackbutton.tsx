import { setPageInfo } from "@/lib/features/pageTitle/pageSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export function usePageTitleandBackButton() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageInfo({ title: "Coin Reports", hasBackButton: true }));
  }, [dispatch]);
}
