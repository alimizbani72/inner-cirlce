import Link from "@/components/Link";
import { snipText } from "@/utils/string";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Icon } from "@/components/icons";

type Props = { content: { [k: string]: any } };

const VideoItem: FC<Props> = ({ content }) => {
  return (
    <Stack
      borderRadius={2}
      border="1.5px solid"
      borderColor={"dark.3"}
      overflow={"hidden"}
      direction="row"
      component={Link}
      href={encodeURIComponent(content.title)}
      gap={1}
      flex={1}
      p={{ md: 3, xs: 2 }}
      alignItems={"center"}
      justifyContent="space-between"
    >
      <Stack gap={1}>
        <Typography variant="p1-medium">{content.title}</Typography>
        <Typography variant="caption-medium" color={"grey.light"} sx={snipText(1)}>
          {content.description}
        </Typography>
      </Stack>

      <Stack>
        <Icon name="Arrow-right" />
      </Stack>
    </Stack>
  );
};

export default VideoItem;
