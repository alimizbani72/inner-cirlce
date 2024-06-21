"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import ModuleItem from "./Item";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectPlaylists } from "@/lib/features/academy/educationSlice";
import { flexItem } from "@/utils/grid";

const Modules: FC = () => {
  const { module } = useParams();

  const playlist = useAppSelector((state) => selectPlaylists(state)(decodeURIComponent(module as string)));

  return (
    <Stack gap={3} direction={{ md: "row", xs: "column" }} flexWrap={{ md: "wrap", xs: undefined }}>
      {playlist.map((item, index) => (
        <Stack key={index} sx={flexItem({ count: { md: 2 }, gap: 24 })}>
          <ModuleItem content={item} />
        </Stack>
      ))}
    </Stack>
  );
};

export default Modules;
