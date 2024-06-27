"use client";

import type { FC } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import ContentStack from "@app/_components/ContentStack";
import RiveComp from "@/components/RiveComp";
import { Icon } from "@/components/icons";
import { flexItem } from "@/utils/grid";
import { useTranslate } from "@/locales";

interface StrategiesItemProps {
  src: string;
  type: string;
  subtitle: string;
  upgrade?: boolean;
}

const StrategiesItem: FC<StrategiesItemProps> = ({ src, subtitle, type, upgrade }) => {
  const { t } = useTranslate();

  return (
    <ContentStack
      p={2}
      gap={1}
      direction={"row"}
      justifyContent={"space-between"}
      height={160}
      minWidth={{ md: 360, xs: "calc(100% - 24px)" }}
      sx={flexItem({ count: { lg: 3, md: 2 }, gap: 24 })}
    >
      <Box sx={{ aspectRatio: 1 }}>
        <RiveComp src={src} width={128} height={128} />
      </Box>

      <Stack p={1} flex={1}>
        <Typography variant="h4-semi-bold" textTransform={"uppercase"}>
          {type}
        </Typography>
        <Typography variant="p2-medium" textTransform={"uppercase"} color={"grey.dark"} mb={2}>
          {subtitle}
        </Typography>
        {upgrade ? (
          <Button
            href="/pricing"
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
              {t("button.upgrade")}
            </Typography>
          </Button>
        ) : (
          <Button href={type} color="info" sx={{ whiteSpace: "nowrap" }}>
            {t("button.seeStrategies")}
          </Button>
        )}
      </Stack>
    </ContentStack>
  );
};

export default StrategiesItem;
