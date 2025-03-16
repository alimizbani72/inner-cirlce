import RiveComp from '@/components/rive-loader';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { Box, Button, Stack, Typography } from '@mui/material';
import LandingContainer from '../LandingContainer';

const FisherMan = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  return (
    <Stack width="100%" position={'relative'} py={{ md: 15, xs: 18.5 }} alignItems={'center'}>
      <Box
        sx={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(86, 92, 228, 0.40) 0%, rgba(7, 7, 32, 0.00) 100%)',
          width: 960,
          height: 960,
          borderRadius: '960px',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          filter: 'blur(140px)',
        }}
      />

      <Typography
        sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', userSelect: 'none' }}
        position={'absolute'}
        fontSize={'88px'}
        fontWeight={600}
        lineHeight={'120px'}
        whiteSpace={'nowrap'}
        zIndex={5}
        textTransform={'uppercase'}
        color={'rgba(255, 255, 255, 0.02)'}
      >
        FISHERMAN • FISHERMAN • FISHERMAN
      </Typography>

      <LandingContainer alignItems={'center'} position="relative">
        <RiveComp
          width={isMobile ? 327 : 352}
          height={isMobile ? 327 : 352}
          src="/assets/rive/fisher_man.riv"
        />
        <Stack
          sx={{
            mt: 4,
            mb: 1,
            width: 124,
            height: 24,
            borderRadius: 1.5,
            background: (theme) => theme.palette.gradient.orange,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography textTransform="uppercase" color="dark.1" variant="caption-semi-bold">
            {t('landingpricing.highlyLimited')}
          </Typography>
        </Stack>

        <Typography color="white" variant="h2-semi-bold">
          {t('landingpricing.fisherman')}
        </Typography>

        <Typography
          color="white"
          variant="h4-regular"
          mt={2}
          mb={3}
          maxWidth={606}
          textAlign="center"
        >
          {t('landingpricing.captaincryptoMessage')}
        </Typography>

        <Button fullWidth={isMobile} size="large">
          {t('landingpricing.applyForFisherman')}
        </Button>
      </LandingContainer>
    </Stack>
  );
};

export default FisherMan;
