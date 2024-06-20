"use client";

import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import CategoryItem from "./Item";
import { useAppSelector } from "@/lib/hooks";
import { selectCategories } from "@/lib/features/academy/educationSlice";

const Categories: FC = () => {
  const categoriesList = useAppSelector(selectCategories);
  return (
    <Stack gap={3}>
      <Typography variant="h4-semi-bold">Categories</Typography>

      <Stack gap={3} direction={{ md: "row", xs: "column" }} flexWrap={{ md: "wrap", xs: undefined }}>
        {categoriesList.map((category, index) => (
          <CategoryItem key={index} content={category} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Categories;
