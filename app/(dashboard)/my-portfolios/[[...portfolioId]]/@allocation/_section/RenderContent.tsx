import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Chart from './Chart';
import type { PortfolioHttpAssetResponse } from '@/services/minecraft/minecraftAPI.schemas';
import { useTranslate } from '@/locales';
import { parseToNumber } from '../../_section/utils';
import RenderChips from './RenderChips';

type Props = {
  assets: PortfolioHttpAssetResponse[];
};
const RenderContent = ({ assets }: Props) => {
  const { t } = useTranslate();
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null);
  const seriesData = assets.map((asset) => ({
    x: asset.name as string,
    y: parseFloat(parseToNumber(asset.distribution).toFixed(2)),
  }));

  return (
    <>
      <Stack width={'100%'}>
        <Typography variant="p1-medium">{t('allocation.allocation')}</Typography>
        <Chart seriesData={seriesData} onHover={setHoveredCrypto} hoveredCrypto={hoveredCrypto} />
      </Stack>
      <RenderChips assets={assets} hoveredCrypto={hoveredCrypto} onHover={setHoveredCrypto} />
    </>
  );
};

export default RenderContent;
