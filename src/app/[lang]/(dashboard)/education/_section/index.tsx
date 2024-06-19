"use client";

import { Stack } from "@mui/material";
import Categories from "./Categories";
import RoadMap from "@dashboard/dashboard/_section/RoadMap";
import { useContentServiceContentVideoAcademyCreateMutation } from "@/services/queries";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { fetchEducationData } from "@/lib/features/academy/educationSlice";

const EducationSection = () => {
  const { mutateAsync } = useContentServiceContentVideoAcademyCreateMutation();
  const dispatch = useAppDispatch();

  const getEducations = async () => {
    try {
      await mutateAsync(
        { requestBody: { lang: "en" } },
        {
          onSuccess: (res) => {
            dispatch(fetchEducationData((res as any).data));
          },
        }
      );
    } catch (_error) {
      //
    }
  };
  useEffect(() => {
    getEducations();
  }, []);
  return (
    <Stack p={{ md: 4, xs: 3 }} gap={{ md: 3, xs: 4 }}>
      <Categories />
      <RoadMap />
    </Stack>
  );
};

export default EducationSection;
