"use client";

import type { FC } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import ContentStack from "@app/_components/ContentStack";
import RiveComp from "@/components/RiveComp";
import { Icon } from "@/components/icons";

interface StrategiesItemProps {
  title: string;
  src: string;
  subtitle: string;
  link: string;
  upgrade?: boolean;
}

const StrategiesItem: FC<StrategiesItemProps> = ({ src, link, subtitle, title, upgrade }) => {
  return (
    <ContentStack
      p={2}
      gap={1}
      direction={"row"}
      justifyContent={"space-between"}
      height={160}
      minWidth={{ md: 360, xs: "calc(100% - 24px)" }}
    >
      <Box sx={{ aspectRatio: 1 }}>
        <RiveComp src={src} width={128} height={128} />
      </Box>

      <Stack p={1} flex={1}>
        <Typography variant="h4-semi-bold" textTransform={"uppercase"}>
          {title}
        </Typography>
        <Typography variant="p2-medium" textTransform={"uppercase"} color={"grey.dark"} mb={2}>
          {subtitle}
        </Typography>
        {upgrade ? (
          <Button
            href={link}
            color="info"
            sx={{ "svg path": { fill: "#E68F0D !important" }, whiteSpace: "nowrap" }}
            startIcon={<Icon name="Subscription" />}
            fullWidth
          >
            <Typography
              variant="p2-medium"
              sx={{
                background: (theme) => theme.palette.gradient.orange,
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              Upgrade
            </Typography>
          </Button>
        ) : (
          <Button href={link} color="info" sx={{ whiteSpace: "nowrap" }}>
            See Strategies
          </Button>
        )}
      </Stack>
    </ContentStack>
  );
};

export default StrategiesItem;
