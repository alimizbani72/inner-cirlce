'use client';

import { selectCategories, selectStatus } from '@/lib/features/academy/educationSlice';
import { useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { flexItem } from '@/utils/grid';
import { Box, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import CategoryItem from './Item';

const Categories: FC = () => {
  const categoriesList = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectStatus) === 'loading';
  const { t } = useTranslate();
  return (
    <Stack gap={3}>
      <Typography variant="h4-semi-bold">{t('categories.title')}</Typography>

      <Stack
        gap={3}
        direction={{ md: 'row', xs: 'column' }}
        flexWrap={{ md: 'wrap', xs: undefined }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Box
                className="loading-skeleton"
                key={index}
                sx={flexItem({ count: { lg: 4, md: 2 }, gap: 24 })}
                height={477}
              />
            ))
          : categoriesList.map((category, index) => (
              <CategoryItem key={index} content={category} />
            ))}
      </Stack>
    </Stack>
  );
};

export default Categories;
