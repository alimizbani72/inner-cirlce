"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import ModuleItem from "./Item";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectPlaylists } from "@/lib/features/academy/educationSlice";

// const arr = [
//   {
//     id: 1,
//     image: "/assets/placeholder-image.webp",
//     title: "What is blockchain",
//     subtitle:
//       "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
//     link: "what-is-the-blockchain",
//   },
//   {
//     id: 2,
//     image: "/assets/placeholder-image.webp",
//     title: "What is blockchain",
//     subtitle:
//       "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
//     link: "what-is-the-blockchain",
//   },
//   {
//     id: 3,
//     image: "/assets/placeholder-image.webp",
//     title: "What is blockchain",
//     subtitle:
//       "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
//     link: "what-is-the-blockchain",
//   },
//   {
//     id: 4,
//     image: "/assets/placeholder-image.webp",
//     title: "What is blockchain",
//     subtitle:
//       "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
//     link: "what-is-the-blockchain",
//   },
// ];

const Modules: FC = () => {
  const { module } = useParams();

  const playlist = useAppSelector((state) => selectPlaylists(state)(decodeURIComponent(module as string)));

  return (
    <Stack gap={3} direction={{ md: "row", xs: "column" }} flexWrap={{ md: "wrap", xs: undefined }}>
      {playlist.map((item, index) => (
        <Stack key={index} flex={{ md: "0 0 50%", sm: 1 }} maxWidth={{ md: "calc(50% - 12px)", xs: "100%" }}>
          <ModuleItem content={item} />
        </Stack>
      ))}
    </Stack>
  );
};

export default Modules;
