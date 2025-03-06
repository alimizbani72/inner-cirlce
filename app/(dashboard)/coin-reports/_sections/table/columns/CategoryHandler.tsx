import { useGetCoinReportCategories } from '@/services/minecraft/coin-report/coin-report';
import { Typography } from '@mui/material';
import { type FC, useMemo } from 'react';
type CategoryHandlerProps = {
  slug: string | null;
};
const CategoryHandler: FC<CategoryHandlerProps> = ({ slug }) => {
  if (!slug) {
    return <Typography variant="p2-medium">••••••••</Typography>;
  }
  const { data: categoriesData, isSuccess } = useGetCoinReportCategories();
  const categoryName = useMemo(
    () => categoriesData?.data?.find((item) => item.slug === slug)?.name || slug,
    [slug, isSuccess]
  );

  return <Typography variant="p2-medium">{categoryName}</Typography>;
};
export default CategoryHandler;
