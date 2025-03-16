import { Scrollbar } from '@/components/scrollbar';
import { Stack } from '@mui/material';
import CryptoChip from './CryptoChip';
import type { PortfolioHttpAssetResponse } from '@/services/minecraft/minecraftAPI.schemas';
type Props = {
  onHover: (label: string | null) => void;
  hoveredCrypto: string | null;
  assets: PortfolioHttpAssetResponse[];
};
const RenderChips = ({ hoveredCrypto, onHover, assets }: Props) => {
  return (
    <Scrollbar>
      <Stack
        direction="row"
        flexWrap="wrap"
        px={{ xs: 0, md: 5 }}
        spacing={1}
        pt={{ xs: 6, md: 9 }}
        justifyContent={'center'}
        sx={{
          maxHeight: '210px',
        }}
      >
        {assets.map((asset: any) => (
          <CryptoChip
            key={asset.slug}
            label={asset.name}
            value={asset.distribution}
            isActive={hoveredCrypto === asset.name}
            onHover={onHover}
          />
        ))}
      </Stack>
    </Scrollbar>
  );
};

export default RenderChips;
