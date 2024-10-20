"use client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useTranslate } from "@/locales";
import { toPascalCase } from "@/utils/change-case";
import RiveComp from "@/components/RiveComp";
import { toNumber } from "@/utils/toNumber";
import { useAffiliateServiceAffiliateMeQuery } from "@minecraft/queries";
import { useGlobalAffiliateHowItWorksServiceGetGlobalsAffiliateHowItWorks } from "@cms/queries";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { useAppSelector } from "@/lib/hooks";

const CMSContentParser = dynamic(() => import("@app/_components/CMSContentParser"), { ssr: false });

const AffiliateHowItWorksSection: FC = () => {
  const { t } = useTranslate();
  const lang = useAppSelector(selectLang);
  const { data: me } = useAffiliateServiceAffiliateMeQuery();
  const { data } = useGlobalAffiliateHowItWorksServiceGetGlobalsAffiliateHowItWorks({ locale: lang });

  return (
    <Stack p={{ md: 4, xs: 3 }} gap={3} direction={{ md: "row", xs: "column-reverse" }}>
      <Stack flex={2 / 3}>
        <CMSContentParser layout={data?.layout} />
      </Stack>
      <Stack flex={1 / 3}>
        <Stack border="1.5px solid" top={{ md: 32 }} position="sticky" borderColor="dark.3" borderRadius={1.5} gap={2}>
          <Stack gap={2} p={2}>
            <Stack direction="row" justifyContent="space-between" bgcolor="blue.dark" borderRadius="10px" px={2} py={1}>
              <Typography variant="p1-regular">{t("afDashboardTab.currentRank")}</Typography>
              <Typography variant="p1-semi-bold">#{toPascalCase(me?.data?.rank?.type)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack alignItems="center" flex={1}>
                <Typography variant="h4-semi-bold">{me?.data?.rank?.percent} %</Typography>
                <Typography variant="p2-medium" color="grey.light">
                  {t("afDashboardTab.overrideBonus")}
                </Typography>
              </Stack>
              <Divider flexItem sx={{ borderWidth: "1px" }} />
              <Stack alignItems="center" flex={1}>
                <Stack direction="row" alignItems="center" position={"relative"}>
                  <Box position="absolute" left="-16px" sx={{ aspectRatio: 1 }}>
                    <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
                  </Box>
                  <Typography pl={4} variant="h4-semi-bold">
                    {toNumber(me?.data?.goldCoins)}
                  </Typography>
                </Stack>
                <Typography variant="p2-medium" color="grey.light">
                  {t("afDashboardTab.goldCoins")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider flexItem sx={{ borderWidth: "1px" }} />

          <Stack p={2} gap={2}>
            <Stack direction="row" justifyContent="space-between" bgcolor="dark.3" borderRadius="10px" px={2} py={1}>
              <Typography variant="p1-regular">{t("afDashboardTab.nextRank")}</Typography>
              <Typography variant="p1-semi-bold" color="pink.dark">
                #{toPascalCase(me?.data?.next_rank?.type)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack alignItems="center" flex={1}>
                <Typography variant="h4-semi-bold" color="success.main">
                  +{me?.data?.next_rank?.percent} %
                </Typography>
                <Typography variant="p2-medium" color="grey.light">
                  {t("afDashboardTab.overrideBonus")}
                </Typography>
              </Stack>
              <Divider flexItem sx={{ borderWidth: "1px" }} />
              <Stack alignItems="center" flex={1}>
                <Stack direction="row" alignItems="center" position={"relative"}>
                  <Box position="absolute" left="-16px">
                    <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
                  </Box>
                  <Typography pl={4} variant="h4-semi-bold" color="success.main">
                    +{toNumber(me?.data?.next_rank?.gold_coins)}
                  </Typography>
                </Stack>
                <Typography variant="p2-medium" color="grey.light">
                  {t("afDashboardTab.goldCoins")}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AffiliateHowItWorksSection;
