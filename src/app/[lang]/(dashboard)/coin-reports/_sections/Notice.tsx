"use client";

import ContentStack from "@app/_components/ContentStack";
import { Box, Collapse, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { snipText } from "@/utils/string";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";

interface NoticeProps {}

const CoinReportNotice: FC<NoticeProps> = () => {
  const isMobile = useIsMobile();
  const [expand, setExpand] = useState(isMobile ?? false);
  const { t } = useTranslate();

  return (
    <Stack px={{ md: 4, xs: 3 }}>
      <ContentStack p={0}>
        <Collapse in={isMobile ? true : expand} collapsedSize={56}>
          <Box p={2} display="flex" flexDirection={expand ? "column" : "row"}>
            <Typography
              component="div"
              variant="p2-regular"
              sx={{ ...(!isMobile && !expand && snipText(1)), position: "relative", flex: 1 }}
            >
              <Typography variant="p2-medium" textTransform="uppercase" color="warning.main">
                {t("coinReportNotice.importantNotice")}
              </Typography>{" "}
              {t("coinReportNotice.message")}
            </Typography>
            {!isMobile && (
              <Typography
                variant="p2-bold"
                color="blue.light"
                component="div"
                sx={{ cursor: "pointer", width: "fit-content" }}
                onClick={() => setExpand((state) => !state)}
              >
                {expand ? t("coinReportNotice.viewLess") : t("coinReportNotice.viewMore")}
              </Typography>
            )}
          </Box>
        </Collapse>
      </ContentStack>
    </Stack>
  );
};

export default CoinReportNotice;
