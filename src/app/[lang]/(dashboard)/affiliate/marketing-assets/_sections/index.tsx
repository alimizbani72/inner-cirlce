"use client";

import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import AssetCard from "./AssetCard";
import { flexItem } from "@/utils/grid";
import NeedHelp from "./NeedHelp";
import { useAffiliateServiceAffiliateMarketingAssetsQuery } from "@minecraft/queries";

const AffiliateMarketingAssetsSection: FC = () => {
  const { data } = useAffiliateServiceAffiliateMarketingAssetsQuery();

  return (
    <Stack p={{ md: 4, xs: 3 }} gap={2} alignItems="center" position="relative">
      <Stack maxWidth={840} width={1} gap={3}>
        <Stack gap={1}>
          <Typography variant="h4-semi-bold">Marketing Assets</Typography>
          <Typography variant="p2-regular" color="#BBBDD0">
            Welcome to our Marketing Assets page! Here, you'll find everything you need to help promote our platform and
            invite others to join our community.
          </Typography>
        </Stack>

        <Stack gap={2}>
          <Typography variant="h4-semi-bold">Downloadable Assets</Typography>
          <Stack gap={3} flexWrap="wrap" direction={{ md: "row" }}>
            {data?.data?.map((item) => (
              <AssetCard
                key={item.title}
                sx={flexItem({ count: { md: 3, xs: 1 }, gap: 24 })}
                type={item.type!}
                title={item.title!}
                description={item.description!}
                items={item.items}
              />
            ))}
          </Stack>
        </Stack>

        <Stack gap={1}>
          <Typography variant="h4-semi-bold">How to Use Our Assets</Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              Attribution:
            </Typography>{" "}
            Whenever you use our assets, please give credit to our brand.
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              Modification:
            </Typography>{" "}
            Feel free to customize our graphics, but ensure they align with our brand guidelines.
          </Typography>

          <Typography variant="p2-regular" color="#BBBDD0">
            <Typography variant="p2-semi-bold" color="#BBBDD0">
              Sharing:
            </Typography>{" "}
            Encourage your audience to visit our platform by sharing your content and tagging us on social media!
          </Typography>
        </Stack>

        <NeedHelp />

        <Typography variant="h4-medium" textAlign="center">
          <Typography variant="h4-medium" color="pink.light">
            Thank you
          </Typography>{" "}
          for helping us grow our community!
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AffiliateMarketingAssetsSection;
