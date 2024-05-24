"use client";
import type { FC } from "react";
import AFDashboardTab from "./Dashboard";
import AffStatisticsTab from "./Statistics";
import AffNetworkTab from "./Network";
import AffCommissionsTab from "./Commissions";
import { Typography } from "@mui/material";

type Props = { value: number };

const TabContent: FC<Props> = ({ value }) => {
  if (value === 1) {
    return <AFDashboardTab />;
  }

  if (value === 2) {
    return <AffStatisticsTab />;
  }

  if (value === 3) {
    return <AffNetworkTab />;
  }

  if (value === 4) {
    return <AffCommissionsTab />;
  }

  if (value === 5) {
    return (
      <Typography variant="h3-semi-bold" p={4} textAlign={"center"}>
        Coming Soon
      </Typography>
    );
  }

  return <AFDashboardTab />;
};

export default TabContent;
