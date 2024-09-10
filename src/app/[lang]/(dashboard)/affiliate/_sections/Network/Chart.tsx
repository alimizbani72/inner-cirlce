"use client";

import type { FC } from "react";
import AffiliateTree from "./AffiliateTree";
import { useAffiliateServiceAffiliateChildrenQuery } from "@minecraft/queries";

const AffNetworkTabChart: FC = () => {
  const { data } = useAffiliateServiceAffiliateChildrenQuery();
  return <AffiliateTree data={data?.data?.nested_users?.[0]} />;
};

export default AffNetworkTabChart;
