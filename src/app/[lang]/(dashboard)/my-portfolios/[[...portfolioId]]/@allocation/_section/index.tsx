"use client";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import CryptoChip from "./CryptoChip";
import Chart from "./Chart";
import { useTranslate } from "@/locales";
import usePortfolioData from "../../_section/hook/usePortfolioData";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import { parseToNumber } from "../../_section/utils";
import Scrollbar from "@/components/Scrollbar";

const Allocation = () => {
  const { t } = useTranslate();
  const { selectedPortfolio, isLoading } = usePortfolioData();
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null);
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const seriesData = (selectedPortfolio?.data as any)?.assets.map((asset: any) => ({
    x: asset.symbol,
    y: parseToNumber(asset.distribution).toFixed(2),
  }));

  return (
    <Stack
      width={{ md: "100%", xs: "342px" }}
      maxWidth={{ md: isCollapsed ? "calc(50vw - 97px)" : "calc(50vw - 168px)" }}
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
      {isLoading ? (
        <Loading sx={{ mt: 2 }} />
      ) : !seriesData?.length ? (
        <Empty sx={{ mt: 2 }} />
      ) : (
        <>
          <Stack width={"100%"}>
            <Typography variant="p1-medium">{t("allocation.allocation")}</Typography>
            <Chart seriesData={seriesData} onHover={setHoveredCrypto} />
          </Stack>

          <Scrollbar options={{ scrollbars: { autoHide: "scroll" } }}>
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1}
              pt={{ xs: 6, md: 9 }}
              justifyContent={"center"}
              sx={{
                maxHeight: "210px",
                // "& > *": { flex: "0 0 auto" },
              }}
            >
              {(selectedPortfolio?.data as any)?.assets.map((asset: any) => (
                <CryptoChip
                  key={asset.symbol}
                  label={asset.symbol}
                  value={asset.distribution}
                  isActive={hoveredCrypto === asset.symbol}
                  onHover={setHoveredCrypto}
                />
              ))}
            </Stack>
          </Scrollbar>
        </>
      )}
    </Stack>
  );
};

export default Allocation;
