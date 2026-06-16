"use client";

import { useTranslate } from "@/locales";
import { flexItem } from "@/utils/grid";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import AssetCard from "./AssetCard";
import LoadingCard from "./LoadingCard";
import NeedHelp from "./NeedHelp";

// ✅ Dummy data to replace the API
const dummyData = {
  data: [
    {
      type: "image",
      title: "Banner Image",
      description: "A promotional banner for social media.",
      items: [
        "/assets/images/dummy-banner.jpg",
        "/assets/images/dummy-banner2.jpg",
      ],
    },
    {
      type: "video",
      title: "Promo Video",
      description: "A short marketing video for campaigns.",
      items: ["/assets/video/promo.mp4"],
    },
    {
      type: "pdf",
      title: "Marketing Guide",
      description: "Step by step marketing guide for affiliates.",
      items: ["/assets/pdf/affiliate-guide.pdf"],
    },
    {
      type: "link",
      title: "Affiliate Signup Link",
      description: "Share this link to invite new users.",
      items: ["https://example.com/affiliate/signup"],
    },
  ],
};

const AffiliateMarketingAssetsSection: FC = () => {
  const { t } = useTranslate();

  const isLoading = false; // no API, so always loaded
  const data = dummyData;

  return (
    <Stack p={{ md: 4, xs: 3 }} gap={2} alignItems="center" position="relative">
      <Stack maxWidth={840} width={1} gap={3}>
        <Stack gap={1}>
          <Typography variant="h4-semi-bold">
            {t("marketingassetTab.marketingAssets")}
          </Typography>
          <Typography variant="p2-regular" color="#BBBDD0">
            {t("marketingassetTab.welcomeMessage")}
          </Typography>
        </Stack>

        <Stack gap={2}>
          <Typography variant="h4-semi-bold">
            {t("marketingassetTab.downloadableAssets")}
          </Typography>

          {isLoading ? (
            <LoadingCard />
          ) : (
            <Stack gap={3} flexWrap="wrap" direction={{ md: "row" }}>
              {data?.data?.map((item) => (
                <AssetCard
                  key={item.title}
                  sx={flexItem({ count: { md: 3, xs: 0 }, gap: 24 })}
                  type={item.type! as any}
                  title={item.title!}
                  description={item.description!}
                  items={item.items}
                />
              ))}
            </Stack>
          )}
        </Stack>

        <Stack gap={1}>
          <Typography variant="h4-semi-bold">
            {t("marketingassetTab.howtoUseOurAssets")}
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              {t("marketingassetTab.attribution")}:
            </Typography>{" "}
            {t("marketingassetTab.WheneveryouuseourassetsMEssage")}
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              {t("marketingassetTab.modification")}:
            </Typography>{" "}
            {t("marketingassetTab.feelfreeMessage")}
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              {t("marketingassetTab.sharing")}:
            </Typography>{" "}
            {t("marketingassetTab.encourageMessage")}{" "}
          </Typography>
        </Stack>

        <NeedHelp />

        <Typography variant="h4-medium" textAlign="center">
          <Typography variant="h4-medium" color="pink.light">
            {t("marketingassetTab.thankyou")}
          </Typography>{" "}
          {t("marketingassetTab.forhelpingusgrowourcommunity")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AffiliateMarketingAssetsSection;
