"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import Modules from "./Modules";
import BreadCrumb from "@/components/breadcrumb";

const EducationModuleSection: FC = () => {
  usePageTitle({ title: "Education", hasBackButton: true });

  return (
    <Stack gap={3} p={{ md: 4, xs: 3 }} height={"100%"}>
      <BreadCrumb />

      <Modules />
      {/* 
      <Stack mt={"auto"} justifyContent={"center"} alignItems={"center"}>
        <Pagination color="primary" siblingCount={1} boundaryCount={1} count={20} size="small" />
      </Stack> */}
    </Stack>
  );
};

export default EducationModuleSection;
