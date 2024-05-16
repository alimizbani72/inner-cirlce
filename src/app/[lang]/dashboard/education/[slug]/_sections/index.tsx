"use client";

import { Pagination, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { useParams } from "next/navigation";
import Videos from "./Videos";

const EducationVideosSection: FC = () => {
  const { slug } = useParams();
  usePageTitle({ title: "Education", hasBackButton: true });

  return (
    <Stack gap={3} p={{ md: 4, xs: 3 }} height={"100%"}>
      <Stack direction={"row"} gap={1} mb={3}>
        <Typography variant="caption-medium" color="grey.light">
          Education
        </Typography>
        <Typography variant="caption-medium">{`>`}</Typography>
        <Typography variant="caption-medium" textTransform={"capitalize"}>
          {slug?.toString()?.replaceAll("-", " ")}
        </Typography>
      </Stack>

      <Videos />

      <Stack mt={"auto"} justifyContent={"center"} alignItems={"center"}>
        <Pagination color="primary" siblingCount={1} boundaryCount={1} count={20} size="small" />
      </Stack>
    </Stack>
  );
};

export default EducationVideosSection;
