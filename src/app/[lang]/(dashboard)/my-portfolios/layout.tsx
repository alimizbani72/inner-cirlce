"use client";
import { selectSelectedPortfolioId } from "@/lib/features/portfolio/portfolioSlice";
import { useAppSelector } from "@/lib/hooks";
import { Stack } from "@mui/material";
import type React from "react";

export type PortfolioLayoutProps = {
  children: React.ReactNode;
  history: React.ReactNode;
  assets: React.ReactNode;
  allocation: React.ReactNode;
};

export default function PortfolioLayout({ children, history, allocation, assets }: PortfolioLayoutProps) {
  const selectedTabId = useAppSelector(selectSelectedPortfolioId);

  const data = !!selectedTabId;
  return (
    <Stack height={"100%"}>
      {children}
      {data && (
        <>
          <Stack direction={{ xs: "column", md: "row" }} px={{ xs: 3, md: 4 }} pb={3} spacing={3}>
            {history}
            {allocation}
          </Stack>
          {assets}
        </>
      )}
    </Stack>
  );
}
