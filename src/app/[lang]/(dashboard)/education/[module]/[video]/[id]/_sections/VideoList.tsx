import Scrollbar from "@/components/Scrollbar";
import { Icon } from "@/components/icons";
import ContentStack from "@app/_components/ContentStack";
import { Stack, TextField, Typography } from "@mui/material";
import { useState, type FC } from "react";
import VideoItem from "./VideoItem";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectVideos } from "@/lib/features/academy/educationSlice";

const VideoList: FC = () => {
  const { video, id } = useParams();

  const videoList = useAppSelector((state) => selectVideos(state)(decodeURIComponent(video as string)));

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
            {videoList
              .filter((vid) => vid?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()))
              .map((item, index, arr) => (
                <Stack key={index} gap={2}>
                  <VideoItem
                    {...item}
                    watching={item.title === decodeURIComponent(id as string)}
                    completed={false}
                    hasDivider={index !== arr.length - 1}
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
