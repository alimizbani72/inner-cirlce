'use client';

import type { FC } from 'react';
import AffiliateTree from './AffiliateTree';
import { useGetAffiliateChildren } from '@/services/minecraft/affiliate/affiliate';

const AffNetworkTabChart: FC = () => {
  const { data } = useGetAffiliateChildren();
  return <AffiliateTree data={data?.data?.nested_users?.[0]} />;
};

export default AffNetworkTabChart;
