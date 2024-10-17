"use client";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import CryptoChip from "./CryptoChip";
import Chart from "./Chart";
import { useTranslate } from "@/locales";
import usePortfolioData from "../../_section/hook/usePortfolioData";

const Allocation = () => {
  const { t } = useTranslate();
  const { selectedPortfolio, isLoading } = usePortfolioData();
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null);

  const seriesData =
    (selectedPortfolio?.data as any)?.assets.map((asset: any) => ({
      x: asset.symbol,
      y: Math.floor(asset.distribution),
    })) || [];
  return (
    <Stack
      width={{ md: "50%", xs: "342px" }}
      height={"320px"}
      p={3}
      sx={{
        bgcolor: "dark.2",
        border: "1px solid",
        borderColor: "dark.3",
        borderRadius: 1.5,
        overflow: "hidden",
      }}
    >
      <Stack width={"100%"}>
        <Typography variant="p1-medium">{t("allocation.allocation")}</Typography>
        <Chart seriesData={seriesData} onHover={setHoveredCrypto} />
      </Stack>
      {!isLoading && (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          flexWrap="wrap"
          gap={1}
          pt={{ xs: 6, md: 9 }}
          px={{ xs: undefined, md: 3 }}
        >
          {(selectedPortfolio?.data as any)?.assets.map((asset: any) => (
            <CryptoChip
              key={asset.symbol}
              label={asset.symbol}
              value={asset.distribution}
              isActive={hoveredCrypto === asset.symbol}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Allocation;
