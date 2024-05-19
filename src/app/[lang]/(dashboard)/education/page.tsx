import { Stack } from "@mui/material";
import type { Metadata } from "next";
import RoadMap from "../dashboard/_section/RoadMap";
import Categories from "./_section/Categories";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Education",
};

export default async function EducationCategories() {
  return (
    <Stack p={{ md: 4, xs: 3 }} gap={{ md: 3, xs: 4 }}>
      <Categories />
      <RoadMap />
    </Stack>
  );
}
