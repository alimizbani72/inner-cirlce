"use client";

import type { FC } from "react";

import { Button, Stack, Typography } from "@mui/material";
import ContentStack from "@/app/[lang]/_components/ContentStack";
import RiveComp from "@/components/RiveComp";

interface StrategiesItemProps {
  title: string;
  riveSource: string;
  subtitle: string;
  link: string;
}

const StrategiesItem: FC<StrategiesItemProps> = ({ riveSource, link, subtitle, title }) => {
  return (
    <ContentStack p={2} gap={1} direction={"row"} justifyContent={"space-between"} height={160} minWidth={360}>
      <RiveComp src={riveSource} width={128} height={128} />

      <Stack p={1}>
        <Typography variant="h4-semi-bold" textTransform={"uppercase"}>
          {title}
        </Typography>
        <Typography variant="p2-medium" textTransform={"uppercase"} color={"grey.dark"} mb={2}>
          {subtitle}
        </Typography>
        <Button href={link} color="info">
          See Strategies
        </Button>
      </Stack>
    </ContentStack>
  );
};

export default StrategiesItem;
