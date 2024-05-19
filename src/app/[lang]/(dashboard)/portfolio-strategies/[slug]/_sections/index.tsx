"use client";

import { Stack } from "@mui/material";
import Notice from "./Notice";
import Table from "./Table";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";

type Props = { pageTitle: string };

const PortfolioStrategiesInnerSection: FC<Props> = ({ pageTitle }) => {
  usePageTitle({ title: pageTitle, hasBackButton: true });

  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      <Notice />

      <Table />
    </Stack>
  );
};

export default PortfolioStrategiesInnerSection;
