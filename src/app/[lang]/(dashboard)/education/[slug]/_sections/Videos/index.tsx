"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import VideoItem from "./Item";

const arr = [
  {
    id: 1,
    image: "/assets/png/registerFrame.png",
    title: "What is blockchain",
    subtitle:
      "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
    link: "what-is-the-blockchain",
  },
  {
    id: 2,
    image: "/assets/png/registerFrame.png",
    title: "What is blockchain",
    subtitle:
      "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
    link: "what-is-the-blockchain",
  },
  {
    id: 3,
    image: "/assets/png/registerFrame.png",
    title: "What is blockchain",
    subtitle:
      "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
    link: "what-is-the-blockchain",
  },
  {
    id: 4,
    image: "/assets/png/registerFrame.png",
    title: "What is blockchain",
    subtitle:
      "With ChainMind, you can rest assured that With ChainMind you can rest assured that here just a small text as a description",
    link: "what-is-the-blockchain",
  },
];

const Videos: FC = () => {
  return (
    <Stack gap={3} direction={{ md: "row", xs: "column" }} flexWrap={{ md: "wrap", xs: undefined }}>
      {arr.map((category) => (
        <Stack key={category.id} flex={{ md: "0 0 50%", sm: 1 }} maxWidth={{ md: "calc(50% - 12px)", xs: "100%" }}>
          <VideoItem content={category} />
        </Stack>
      ))}
    </Stack>
  );
};

export default Videos;
