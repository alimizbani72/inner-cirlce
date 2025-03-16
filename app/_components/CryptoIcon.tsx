import Icon from '@/components/icon';
import { Image } from '@/components/image';
import { Box, Stack, Typography } from '@mui/material';

type CryptoIconProps = {
  name: string;
  symbol: string;
  logoUrl: string;
};
const CryptoIcon = ({ name, symbol, logoUrl }: CryptoIconProps) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ minWidth: '97px' }}>
      <Stack>
        {symbol ? (
          <Image src={logoUrl} width={24} height={24} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 24,
              height: 24,
              background:
                'var(--Gradients-Gradient-Sky, radial-gradient(50% 50% at 50% 50%, #FFF 0%, #CDDFF2 100%))',
              borderRadius: '50%',
            }}
          >
            <Icon name="QuestionIcon" stroke="dark.1" />
          </Box>
        )}
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'start', md: 'center' }}
        spacing={{ xs: 0, md: 1 }}
      >
        <Typography
          variant="p2-medium"
          sx={{
            wordBreak: { xs: 'break-all', md: 'normal' },
          }}
          whiteSpace={{ xs: 'none', md: 'wrap' }}
        >
          {symbol ? name : '••••••••'}
        </Typography>
        <Typography variant="p2-medium" sx={{ color: 'grey.light', textTransform: 'uppercase' }}>
          {symbol ?? '••••'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CryptoIcon;
