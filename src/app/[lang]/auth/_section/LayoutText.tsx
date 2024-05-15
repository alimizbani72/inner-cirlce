"use client";

import { useTranslate } from "@/locales";
import { Typography } from "@mui/material";

const LayoutText = () => {
  const { t } = useTranslate();

  return (
    <Typography variant="p2-regular">
      {t("global.authLayout").split("experience")[0]}
      <br />
      {t("global.authLayout").split("experience")[1]}
    </Typography>
  );
};
export default LayoutText;
