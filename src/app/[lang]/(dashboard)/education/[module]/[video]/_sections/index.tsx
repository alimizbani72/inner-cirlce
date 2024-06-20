"use client";

import { Pagination, Stack } from "@mui/material";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import Videos from "./Videos";
import BreadCrumb from "@/components/breadcrumb";

const EducationVideosSection: FC = () => {
  usePageTitle({ title: "Education", hasBackButton: true });

  return (
    <Stack gap={3} p={{ md: 4, xs: 3 }} height={"100%"}>
      <BreadCrumb />
      <Videos />

      <Stack mt={"auto"} justifyContent={"center"} alignItems={"center"}>
        <Pagination color="primary" siblingCount={1} boundaryCount={1} count={20} size="small" />
      </Stack>
    </Stack>
  );
};

export default EducationVideosSection;
