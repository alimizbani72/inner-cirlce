import Scrollbar from "@/components/Scrollbar";
import { Icon } from "@/components/icons";
import ContentStack from "@app/_components/ContentStack";
import { Stack, TextField, Typography } from "@mui/material";
import { useState, type FC } from "react";
import VideoItem from "./VideoItem";

const arr = [
  {
    id: "234214",
    image: "/assets/placeholder-image.webp",
    title: "How to make changes in my space?",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
  {
    id: "345345",
    image: "/assets/placeholder-image.webp",
    title: "Lorem ipsum..",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
  {
    id: "6456",
    image: "/assets/placeholder-image.webp",
    title: "Hiiii.....",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
  {
    id: "sf5423",
    image: "/assets/placeholder-image.webp",
    title: "Something without context...",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
  {
    id: "sf52d3",
    image: "/assets/placeholder-image.webp",
    title: "How to make changes in my space?",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
  {
    id: "sf5ewr23",
    image: "/assets/placeholder-image.webp",
    title: "How are you",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
  {
    id: "sf52w3",
    image: "/assets/placeholder-image.webp",
    title: "It's just for testing purposes",
    link: { slug: "blockchain-academy", id: "what-is-the-blockchain" },
  },
];

const VideoList: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <ContentStack
      borderRadius={{ md: 2 }}
      border={{ md: "1.5px solid" }}
      borderColor={{ md: "dark.3" }}
      bgcolor={{ md: "dark.2" }}
      p={{ md: 3 }}
    >
      <Typography variant="h4-semi-bold" mb={2}>
        Education Videos
      </Typography>

      <TextField
        placeholder="Search"
        sx={{
          ".MuiInputBase-root": {
            borderRadius: "28px !important",
            backgroundColor: "dark.3",
            path: { stroke: (theme) => theme.palette.grey.dark },
            mb: 3,
          },
        }}
        InputProps={{ startAdornment: <Icon name="Search" /> }}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      <Stack mx={"-24px"}>
        <Scrollbar>
          <Stack gap={2} maxHeight={{ md: "63vh" }} px={3}>
            {arr
              .filter((vid) => vid?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()))
              .map((item, index) => (
                <Stack key={item.id} gap={2}>
                  <VideoItem
                    {...item}
                    watching={index === 2}
                    completed={index < 2}
                    hasDivider={index + 1 !== arr.length}
                  />
                </Stack>
              ))}
          </Stack>
        </Scrollbar>
      </Stack>
    </ContentStack>
  );
};

export default VideoList;
