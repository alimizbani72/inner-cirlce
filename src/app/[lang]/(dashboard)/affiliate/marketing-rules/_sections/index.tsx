"use client";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { termsAndConditions } from "@/assets/html/terms";
import Image from "@/components/Image";

const ContentParser = dynamic(() => import("@app/_components/ContentParser"), { ssr: false });

const AffiliateMarketingRulesSection: FC = () => {
  return (
    <Stack p={{ md: 4, xs: 3 }} gap={2} alignItems="center" position="relative">
      <Stack maxWidth={744}>
        <Image src="/assets/png/rules.png" width="100%" />

        <ContentParser content={termsAndConditions} />
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
          background: "linear-gradient(180deg, rgba(7, 7, 32, 0.00) 0%, #070720 100%)",
        }}
      />
    </Stack>
  );
};

export default AffiliateMarketingRulesSection;
