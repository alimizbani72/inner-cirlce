import Image from "@/components/Image";
import Link from "@/components/Link";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

type Props = { content: { [k: string]: any } };

const CategoryItem: FC<Props> = ({ content }) => {
  return (
    <Stack borderRadius={2} border="1.5px solid" borderColor={"dark.3"} overflow={"hidden"}>
      <Box height={"188px"} width={"100%"}>
        <Image src={content.image} width={"100%"} height={"100%"} />
      </Box>

      <Stack gap={3} p={2} bgcolor={"dark.3"} alignItems={"flex-start"}>
        <Stack gap={1}>
          <Typography variant="p1-medium">{content.title}</Typography>
          <Typography variant="caption-medium" color={"grey.light"}>
            {content.subtitle}
          </Typography>
        </Stack>

        <Link href={content.link} display={"flex"}>
          <Typography variant="p2-medium" color={"pink.light"} sx={{ cursor: "pointer" }}>
            More Details
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
};

export default CategoryItem;
