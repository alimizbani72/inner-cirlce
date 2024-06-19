"use client";

import { Stack } from "@mui/material";
import Notice from "./Notice";
import Table from "./Table";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";

type Props = { pageTitle: string; plan: string };

const PortfolioStrategiesInnerSection: FC<Props> = ({ pageTitle, plan }) => {
  usePageTitle({ title: pageTitle, hasBackButton: true });

  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      <Notice />

      <Table plan={plan} />
    </Stack>
  );
};

export default PortfolioStrategiesInnerSection;
