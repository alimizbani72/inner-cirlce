"use client";

import { Stack } from "@mui/material";
import Categories from "./Categories";
import RoadMap from "@dashboard/dashboard/_section/RoadMap";

const EducationSection = () => {
  return (
    <Stack p={{ md: 4, xs: 3 }} gap={{ md: 3, xs: 4 }}>
      <Categories />
      <RoadMap />
    </Stack>
  );
};

export default EducationSection;
