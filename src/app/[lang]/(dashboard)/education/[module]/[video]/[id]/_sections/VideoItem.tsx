import Image from "@/components/Image";
import Link from "@/components/Link";
import { Icon } from "@/components/icons";
import { snipText } from "@/utils/string";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import type { FC } from "react";

interface VideoItemProps {
  title: string;
  image?: string;
  completed?: boolean;
  watching?: boolean;
  hasDivider?: boolean;
}

const VideoItem: FC<VideoItemProps> = ({ image, title, completed, watching, hasDivider }) => {
  const { module, video } = useParams();
  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        component={Link}
        href={`/education/${module}/${video}/${encodeURIComponent(title as string)}`}
      >
        <Box width={"98px"} height={"53px"}>
          <Image width={"100%"} height={"100%"} borderRadius={"8px"} src={image} />
        </Box>

        <Stack direction={"row"} gap={1} flex={1}>
          <Typography variant="p2-medium" sx={snipText(2)}>
            {title}
          </Typography>
          {(completed || watching) && (
            <Box
              ml={"auto"}
              width={24}
              // sx={{
              //   ...(completed && { path: { stroke: (theme) => theme.palette.success.main } }),
              //   ...(watching && {
              //     path: { stroke: (theme) => theme.palette.pink.dark, "&:nth-of-type(2)": { display: "none" } },
              //   }),
              // }}
            >
              <Icon name="Play" />
            </Box>
          )}
        </Stack>
      </Stack>
      {hasDivider && (
        <Divider
          flexItem
          sx={{
            borderWidth: "1.5px",
            // ...(watching && { borderColor: "blue.dark" })
          }}
        />
      )}
    </>
  );
};

export default VideoItem;
