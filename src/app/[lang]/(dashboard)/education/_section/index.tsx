"use client";

import { Stack } from "@mui/material";
import Categories from "./Categories";
import RoadMap from "@dashboard/dashboard/_section/RoadMap";
import { useAppDispatch } from "@/lib/hooks";
import { useContentServiceContentVideoAcademyLangQuery } from "@/services/queries";

const EducationSection = () => {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { data } = useContentServiceContentVideoAcademyLangQuery({ lang: "en" });
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const dispatch = useAppDispatch();

  // const getEducations = async () => {
  //   try {
  //     await mutateAsync(
  //       { requestBody: { lang: "en" } },
  //       {
  //         onSuccess: (res) => {
  //           dispatch(fetchEducationData((res as any).data));
  //         },
  //       }
  //     );
  //   } catch (_error) {
  //     //
  //   }
  // };
  // useEffect(() => {
  //   getEducations();
  // }, []);
  return (
    <Stack p={{ md: 4, xs: 3 }} gap={{ md: 3, xs: 4 }}>
      <Categories />
      <RoadMap />
    </Stack>
  );
};

export default EducationSection;
