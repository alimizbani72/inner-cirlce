"use client";

import ContentStack from "@app/_components/ContentStack";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useTranslate } from "@/locales";

interface NoticeProps {}

const PortfolioNotice: FC<NoticeProps> = () => {
  const { t } = useTranslate();

  return (
    <Stack px={{ md: 4, xs: 3 }}>
      <ContentStack p={0}>
        <Box p={2}>
          <Typography variant="p2-regular">
            <Typography variant="p2-medium" textTransform="uppercase" color="warning.main">
              {t("portfolioNotice.note")}
            </Typography>{" "}
            {t("portfolioNotice.message")}
          </Typography>
        </Box>
      </ContentStack>
    </Stack>
  );
};

export default PortfolioNotice;
