// pages/index.tsx
"use client";
import { useTranslate } from "@/locales";
import { Typography } from "@mui/material";
import RiveComp from "@/components/RiveComp";

const SignInSection = () => {
  const { t } = useTranslate();
  return (
    <div>
      <Typography variant="h1-bold" color="white">
        {t("demo.title")}
      </Typography>
      <RiveComp src="/assets/rive/whale_animation.riv" width={500} height={500} />
    </div>
  );
};

export default SignInSection;
