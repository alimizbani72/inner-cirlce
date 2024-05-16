"use client";

import { setPageInfo } from "@/lib/features/pageTitle/pageSlice";
import { useAppDispatch } from "@/lib/hooks";

// ----------------------------------------------------------------------

type Props = { title: string; hasBackButton?: boolean };

export function usePageTitle({ title, hasBackButton = false }: Props) {
  const dispatch = useAppDispatch();

  dispatch(setPageInfo({ title, hasBackButton }));
}
