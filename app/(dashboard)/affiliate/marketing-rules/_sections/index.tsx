"use client";
import { Image } from "@/components/image";
import { Box, Stack } from "@mui/material";
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
            children: [{ text: "Welcome to our affiliate marketing rules." }],
          },
        ],
      },
      {
        id: "2",
        blockType: "blockImage",
        image: {
          url: "/assets/png/partner.png", // put this in /public/assets/images/
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
                text: "Always follow branding guidelines and do not misuse assets.",
              },
            ],
          },
        ],
      },
    ],
  },
};
const AffiliateMarketingRulesSection: FC = () => {
  const isLoading = false; // since we are using dummy data, we can set loading to false
  return (
    <Stack p={{ md: 4, xs: 3 }} gap={2} alignItems="center" position="relative">
      <Stack maxWidth={744}>
        <Image src="/assets/png/rules.png" width="100%" />
        <Stack borderRadius={1} className={isLoading ? "loading-skeleton" : ""}>
          <CMSContentParser layout={data?.data.layout as any} />
        </Stack>
      </Stack>

      <Box
        sx={{
          position: { md: "sticky", xs: "fixed" },
          mt: { md: "-90px" },
          left: 0,
          bottom: "-1px",
          right: 0,
          height: "120px",
          width: "100%",
          background:
            "linear-gradient(180deg, rgba(7, 7, 32, 0.00) 0%, #070720 100%)",
        }}
      />
    </Stack>
  );
};

export default AffiliateMarketingRulesSection;
