"use client";
import { Icon } from "@/components/icons";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useTranslate } from "@/locales";

const LearningBanner: FC = () => {
  const { t } = useTranslate();

  return (
    <Stack
      sx={{
        position: "relative",
        overflow: "hidden",
        m: { md: 4, xs: 3 },
        mb: "0 !important",
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: "dark.3",
      }}
    >
      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
          width: { md: 400, xs: 288 },
          height: { md: 400, xs: 288 },
          borderRadius: { md: "400px", xs: "288px" },
          position: "absolute",
          left: { md: "-200px", xs: "-144px" },
          top: { md: "-100px", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <img src="/assets/texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
          width: { md: 400, xs: 288 },
          height: { md: 400, xs: 288 },
          borderRadius: { md: "400px", xs: "288px" },
          position: "absolute",
          right: { md: "-200px", xs: "-144px" },
          top: { md: "-100px", xs: "unset" },
          bottom: { md: "unset", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Stack
        sx={{
          p: { md: 2, xs: 4 },
          position: "relative",
          zIndex: 1,
          justifyContent: "space-between",
          alignItems: { md: "center", xs: undefined },
          flexDirection: { md: "row", xs: "column" },
          gap: { md: undefined, xs: 6 },
        }}
      >
        <Stack gap={2} direction="row">
          <Box
            sx={{
              width: "2px",
              bgcolor: "dark.1",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "30%", bgcolor: "blue.dark" }} />
          </Box>
          <Typography variant="p1-semi-bold">{t("learningBanner.title")}</Typography>
        </Stack>

        <Button color="info" size="large" startIcon={<Icon name="Play" />}>
          {t("learningBanner.buttonText")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default LearningBanner;
