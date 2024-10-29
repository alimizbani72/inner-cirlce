"use client";
import Scrollbar from "@/components/Scrollbar";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import Toggle from "@app/_components/Toggle";
import { Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
// ----------------------------------------------------------------------

export default function AffTemplate() {
  const params = usePathname();
  const router = useAppRouter();
  const { t } = useTranslate();

  const buttons = useMemo(
    () => [
      { label: t("affiliateSection.dashboard"), value: "dashboard" },
      {
        label: (
          <Stack direction="row" gap={1} alignItems="center">
            {t("affiliateSection.statistics")}
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ borderRadius: 1.5, backgroundColor: "dark.1" }}
              px={1}
              height={24}
            >
              <Typography
                variant="caption-semi-bold"
                sx={{
                  background: (theme) => theme.palette.gradient.pink,
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {t("affiliateSection.comingSoon")}
              </Typography>
            </Stack>
          </Stack>
        ),
        value: "statistics",
      },
      { label: t("affiliateSection.network"), value: "network" },
      { label: t("affiliateSection.commissions"), value: "commissions" },
      { label: t("affiliateSection.payouts"), value: "payouts" },
    ],
    [t]
  );
  return (
    <Scrollbar>
      <Stack pl={{ md: 4, xs: 3 }} alignItems="flex-start" maxWidth="100vw">
        <Stack pr={{ md: 4, xs: 3 }}>
          <Toggle
            setValue={(value) => router.push(`/affiliate/${value === "dashboard" ? "" : value}`)}
            buttons={buttons}
            value={params?.split("/")?.[3] || "dashboard"}
          />
        </Stack>
      </Stack>
    </Scrollbar>
  );
}
