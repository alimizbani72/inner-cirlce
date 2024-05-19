"use client";

import type { FC } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import ContentStack from "@app/_components/ContentStack";
import Image from "@/components/Image";

interface StrategiesItemProps {
  title: string;
  src: string;
  subtitle: string;
  link: string;
}

const StrategiesItem: FC<StrategiesItemProps> = ({ src, link, subtitle, title }) => {
  return (
    <ContentStack
      p={2}
      gap={1}
      direction={"row"}
      justifyContent={"space-between"}
      height={160}
      minWidth={{ md: 360, xs: "calc(100% - 24px)" }}
    >
      <Box width={128} height={128}>
        <Image src={src} width={"100%"} height={"100%"} />
      </Box>

      <Stack p={1}>
        <Typography variant="h4-semi-bold" textTransform={"uppercase"}>
          {title}
        </Typography>
        <Typography variant="p2-medium" textTransform={"uppercase"} color={"grey.dark"} mb={2}>
          {subtitle}
        </Typography>
        <Button href={link} color="info" sx={{ whiteSpace: "nowrap" }}>
          See Strategies
        </Button>
      </Stack>
    </ContentStack>
  );
};

export default StrategiesItem;
