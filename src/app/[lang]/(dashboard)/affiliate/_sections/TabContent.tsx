"use client";
import type { FC } from "react";
import AFDashboardTab from "./Dashboard";

type Props = { value: number };

const TabContent: FC<Props> = ({ value }) => {
  if (value === 1) {
    return <AFDashboardTab />;
  }

  return <AFDashboardTab />;
};

export default TabContent;
