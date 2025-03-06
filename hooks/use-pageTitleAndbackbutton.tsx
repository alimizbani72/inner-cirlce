import { setPageInfo } from '@/lib/features/pageTitle/pageSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';
type Props = { title: string };
export function usePageTitleandBackButton({ title }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageInfo({ title, hasBackButton: true }));
    return () => {
      dispatch(setPageInfo({ title: '', hasBackButton: false }));
    };
  }, [dispatch]);
}
