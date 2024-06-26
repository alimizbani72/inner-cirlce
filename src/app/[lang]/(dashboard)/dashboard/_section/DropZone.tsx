"use client";

import type { FC } from "react";
import {} from "@mui/material";
import ComingSoon from "@app/_components/ComingSoon";
import { useTranslate } from "@/locales";

const DropZone: FC = () => {
  const { t } = useTranslate();

  return <ComingSoon subtitle={t("dropZone.subtitle")} borderRadius={2} />;
};

export default DropZone;
