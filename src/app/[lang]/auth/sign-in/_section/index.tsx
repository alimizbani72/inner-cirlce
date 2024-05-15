// pages/index.tsx
"use client";
import { useTranslate } from "@/locales";
import { Stack, Typography } from "@mui/material";

const SignInSection = () => {
  const { t } = useTranslate();
  return (
    <Stack sx={{ bgcolor: "red", height: "100%" }}>
      <Typography>{t("createAccount.login")}</Typography>
    </Stack>
  );
};

export default SignInSection;
