"use client";

import ContentStack from "@/app/[lang]/_components/ContentStack";
import { Box, Collapse, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { snipText } from "@/utils/string";
import { useIsMobile } from "@/hooks/use-responsive";

interface NoticeProps {}

const Notice: FC<NoticeProps> = () => {
  const isMobile = useIsMobile();
  const [expand, setExpand] = useState(isMobile ?? false);

  return (
    <Stack p={{ md: 4, xs: 3 }} pb={"0 !important"}>
      <ContentStack p={0}>
        <Collapse in={isMobile ? true : expand} collapsedSize={56}>
          <Box p={2} display="flex" flexDirection={expand ? "column" : "row"}>
            <Typography
              component="div"
              variant="p2-regular"
              sx={{ ...(!isMobile && !expand && snipText(1)), position: "relative", flex: 1 }}
            >
              <Typography variant="p2-medium" textTransform="uppercase" color="warning.main">
                IMPORTANT NOTICE:
              </Typography>{" "}
              The values and forecasts presented herein are based on our personal assessments of the market and do not
              constitute buy recommendations or any form of guarantees. All investments carry risks, and it is crucial
              to acknowledge the risk disclaimer confirmed during registration. Unauthorised distribution of the
              information provided will be subject to criminal prosecution and will result in a permanent account
              suspension.
            </Typography>
            {!isMobile && (
              <Typography
                variant="p2-bold"
                color="blue.light"
                component="div"
                sx={{ cursor: "pointer", width: "fit-content" }}
                onClick={() => setExpand((state) => !state)}
              >
                {expand ? "VIEW LESS..." : "VIEW MORE..."}
              </Typography>
            )}
          </Box>
        </Collapse>
      </ContentStack>
    </Stack>
  );
};

export default Notice;
