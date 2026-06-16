"use client";
import RiveComp from "@/components/rive-loader";
import { useTranslate } from "@/locales";
import { useGetAffiliateMe } from "@/services/minecraft/default/default";
import { toPascalCase } from "@/utils/change-case";
import { toNumber } from "@/utils/toNumber";
import type { CMSBlock } from "@app-components/CMSContentParser";
import { Box, Divider, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import type { FC } from "react";
const CMSContentParser = dynamic(
  () => import("@app-components/CMSContentParser"),
  { ssr: false },
);
const data = {
  data: {
    layout: [
      {
        id: "1",
        blockType: "blockText",
        content: [
          {
            type: "paragraph",
            children: [
              {
                text: "Invite your friends and earn commissions from their activity.",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        blockType: "blockImage",
        image: {
          url: "/assets/png/business.png",
          alt: "business",
        },
      },
      {
        id: "3",
        blockType: "blockText",
        content: [
          {
            type: "paragraph",
            children: [
              {
                text: "Increase your rank and unlock higher rewards and bonuses.",
              },
            ],
          },
        ],
      },
    ],
  },
};
const AffiliateHowItWorksSection: FC = () => {
  const { t } = useTranslate();
  // const lang = useAppSelector(selectLang);
  const { data: me, isLoading } = useGetAffiliateMe();
  const howItWorkLoading = false;

  return (
    <Stack
      p={{ md: 4, xs: 3 }}
      gap={3}
      direction={{ md: "row", xs: "column-reverse" }}
    >
      <Stack
        flex={2 / 3}
        borderRadius={1}
        className={howItWorkLoading ? "loading-skeleton" : ""}
      >
        <CMSContentParser layout={data?.data?.layout as CMSBlock[]} />
      </Stack>

      <Stack flex={1 / 3}>
        <Stack
          border="1.5px solid"
          top={{ md: 32 }}
          position="sticky"
          borderColor="dark.3"
          borderRadius={1.5}
          gap={2}
          height={"331.59px"}
          className={isLoading ? "loading-skeleton" : ""}
        >
          {!!me?.data && (
            <>
              <Stack gap={2} p={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  bgcolor="blue.dark"
                  borderRadius="10px"
                  px={2}
                  py={1}
                >
                  <Typography variant="p1-regular">
                    {t("afDashboardTab.currentRank")}
                  </Typography>
                  <Typography variant="p1-semi-bold">
                    #{toPascalCase(me?.data?.rank?.type)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack alignItems="center" flex={1}>
                    <Typography variant="h4-semi-bold">
                      {me?.data?.rank?.percent} %
                    </Typography>
                    <Typography variant="p2-medium" color="grey.light">
                      {t("afDashboardTab.overrideBonus")}
                    </Typography>
                  </Stack>
                  <Divider flexItem sx={{ borderWidth: "1px" }} />
                  <Stack alignItems="center" flex={1}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      position={"relative"}
                    >
                      <Box
                        position="absolute"
                        left="-16px"
                        sx={{ aspectRatio: 1 }}
                      >
                        <RiveComp
                          src="/assets/rive/coin_rotation_2.riv"
                          width={60}
                          height={60}
                        />
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  bgcolor="dark.3"
                  borderRadius="10px"
                  px={2}
                  py={1}
                >
                  <Typography variant="p1-regular">
                    {t("afDashboardTab.nextRank")}
                  </Typography>
                  <Typography variant="p1-semi-bold" color="pink.dark">
                    #{toPascalCase("New Rank")}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack alignItems="center" flex={1}>
                    <Typography variant="h4-semi-bold" color="success.main">
                      +{10} %
                    </Typography>
                    <Typography variant="p2-medium" color="grey.light">
                      {t("afDashboardTab.overrideBonus")}
                    </Typography>
                  </Stack>
                  <Divider flexItem sx={{ borderWidth: "1px" }} />
                  <Stack alignItems="center" flex={1}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      position={"relative"}
                    >
                      <Box position="absolute" left="-16px">
                        <RiveComp
                          src="/assets/rive/coin_rotation_2.riv"
                          width={60}
                          height={60}
                        />
                      </Box>
                      <Typography
                        pl={4}
                        variant="h4-semi-bold"
                        color="success.main"
                      >
                        +{toNumber(me?.data?.next_rank?.gold_coins)}
                      </Typography>
                    </Stack>
                    <Typography variant="p2-medium" color="grey.light">
                      {t("afDashboardTab.goldCoins")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AffiliateHowItWorksSection;
