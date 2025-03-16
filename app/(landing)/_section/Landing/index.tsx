'use client';

import { Stack } from '@mui/material';
import LandingHero from './LandingHero';
import Opportunity from './Opportunity';
import Problems from './Problems';
import Solution from './Solution';
import How from './How';
import Results from './Results';
import WhyChainMind from './WhyChainMind';
import Pricing from './Pricing';
import VisionMission from './VisionMission';
import StayInTouch from './StayInTouch';

import { useAppSelector } from '@/lib/hooks';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useGetPages } from '@/services/cms/pages/pages';
import type { Pages } from '@/services/cms/chainmindCms.schemas';

const HomePageSection = () => {
  const lang = useAppSelector(selectLang);

  const { data, isFetching } = useGetPages({ locale: lang });
  const findContent = (type: Pages['layout'][number]['blockType']) =>
    data?.data?.docs?.[0]?.layout.find((item) => item.blockType === type);

  return (
    <Stack alignItems={'center'}>
      <LandingHero {...(findContent('Hero') as any)} isLoading={isFetching} />

      <Opportunity {...(findContent('Opportunity') as any)} isLoading={isFetching} />

      <Problems {...(findContent('Problem') as any)} isLoading={isFetching} />

      <Solution />

      <How />

      <Results />

      <Pricing />

      <WhyChainMind />

      <VisionMission />

      <StayInTouch />
    </Stack>
  );
};

export default HomePageSection;
