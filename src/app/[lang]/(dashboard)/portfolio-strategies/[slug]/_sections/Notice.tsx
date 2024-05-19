"use client";

import ContentStack from "@app/_components/ContentStack";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface NoticeProps {}

const Notice: FC<NoticeProps> = () => {
  return (
    <Stack px={{ md: 4, xs: 3 }}>
      <ContentStack p={0}>
        <Box p={2}>
          <Typography variant="p2-regular">
            <Typography variant="p2-medium" textTransform="uppercase" color="warning.main">
              NOTE:
            </Typography>{" "}
            By upgrading, subscribers can access additional benefits, enhanced functionalities, and premium content not
            available in their current plan.
          </Typography>
        </Box>
      </ContentStack>
    </Stack>
  );
};

export default Notice;
