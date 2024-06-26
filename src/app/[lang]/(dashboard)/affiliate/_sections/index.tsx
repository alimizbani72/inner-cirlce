"use client";

import Scrollbar from "@/components/Scrollbar";
import Toggle from "@app/_components/Toggle";
import { Stack, Typography } from "@mui/material";
import { useMemo, useState, type FC } from "react";
import TabContent from "./TabContent";
import AffiliateHeader from "./Header";
import { useTranslate } from "@/locales";

const AffiliateSection: FC = () => {
  const { t } = useTranslate();

  const buttons = useMemo(
    () => [
      { label: t("affiliateSection.dashboard"), value: 1 },
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
        value: 2,
      },
      { label: t("affiliateSection.network"), value: 3 },
      { label: t("affiliateSection.commissions"), value: 4 },
      { label: t("affiliateSection.payouts"), value: 5 },
    ],
    [t]
  );
  const [value, setValue] = useState<any>(buttons[0].value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Stack flex={1}>
      {/* Header */}
      <AffiliateHeader />

      {/* Tabs */}
      <Scrollbar>
        <Stack pl={{ md: 4, xs: 3 }} alignItems="flex-start" maxWidth="100vw">
          <Stack pr={{ md: 4, xs: 3 }}>
            <Toggle setValue={handleChange} buttons={buttons} value={value} />
          </Stack>
        </Stack>
      </Scrollbar>

      {/* Tab Content */}
      <Stack flex={1}>
        <TabContent value={value} />
      </Stack>
    </Stack>
  );
};

export default AffiliateSection;
