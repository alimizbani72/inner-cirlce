"use client";

import type { BoxProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Icon } from "./icons";
import type { iconsType } from "./icons/iconsNames";
import { useTranslate } from "@/locales";

type Props = {
  icon?: iconsType;
  title?: string;
  subtitle?: string;
  sx?: BoxProps["sx"];
};

const Empty: FC<Props> = ({ icon, title, subtitle, sx }) => {
  const { t } = useTranslate();

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: { md: 6 }, p: 6, ...sx }}>
      <Stack alignItems="center" justifyContent="center" borderRadius="110px" mb={3}>
        <Icon name={icon || "Warning-round"} size={60} />
      </Stack>

      <Typography variant="p1-semi-bold" color="white" textAlign="center">
        {title || t("empty.thereIsNothingToShow")}
      </Typography>

      {subtitle && (
        <Typography mt={1} color="grey.light" variant="p2-medium" textAlign="center">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default Empty;
