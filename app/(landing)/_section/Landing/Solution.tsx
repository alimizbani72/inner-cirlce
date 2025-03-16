import Icon from '@/components/icon';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { Box, Button, Stack, Typography } from '@mui/material';
import LandingContainer from './LandingContainer';
import SectionTitle from './SectionTitle';

const Solution = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  return (
    <Stack
      width={{ md: 'calc(100% - 32px)', xs: 'calc(100% - 16px)' }}
      mx={{ md: 2, xs: 1 }}
      sx={{
        background: 'linear-gradient(180deg, #CDDFF2 0%, #F6FAFF 100%)',
        borderRadius: { md: 4, xs: 3 },
      }}
      py={{ md: 12, xs: 8 }}
      alignItems={'center'}
      position={'relative'}
      overflow={'hidden'}
    >
      <Box sx={{ position: 'absolute', top: '-450px', zIndex: 1 }}>
        <img
          src="/assets/svg/checkout-flares.svg"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Stack alignItems={'center'} width={'100%'} position={'relative'} zIndex={3}>
        <SectionTitle title="Solution" color="dark.1" firsLetterColor="blue.dark" />

        <Stack gap={{ md: 4, xs: 3 }} width={'100%'} alignItems={'center'}>
          <LandingContainer
            flex={1}
            my={{ md: 12, xs: 8 }}
            px={{ md: 3, xs: 2 }}
            alignItems={'center'}
          >
            <Typography
              textAlign="center"
              variant={isMobile ? 'p1-medium' : 'h4-medium'}
              color="dark.1"
              maxWidth={736}
              width={'100%'}
            >
              {t('solution.secretMessage')}
            </Typography>
          </LandingContainer>

          <Stack width={'100%'} bgcolor="common.white" alignItems={'center'} position={'relative'}>
            <Box
              sx={{
                position: 'absolute',
                bgcolor: 'success.main',
                height: 4,
                width: { md: 96, xs: 64 },
                top: 0,
                transform: 'rotate(90deg)',
                borderRadius: 1,
              }}
            />
            <LandingContainer
              flex={1}
              py={{ md: 12, xs: 8 }}
              px={{ md: 3, xs: 2 }}
              alignItems={'center'}
            >
              <Typography
                textAlign="center"
                variant={isMobile ? 'p1-medium' : 'h4-medium'}
                color="dark.1"
                maxWidth={736}
                width={'100%'}
              >
                {t('solution.chainmindreasonMessage')}
              </Typography>
            </LandingContainer>
            <Box
              sx={{
                position: 'absolute',
                bgcolor: 'success.main',
                height: 4,
                width: { md: 96, xs: 64 },
                bottom: 0,
                transform: 'rotate(90deg)',
                borderRadius: 1,
              }}
            />
          </Stack>

          <LandingContainer
            flex={1}
            my={{ md: 12, xs: 8 }}
            px={{ md: 3, xs: 2 }}
            alignItems={'center'}
          >
            <Typography
              textAlign="center"
              variant={isMobile ? 'p1-medium' : 'h4-medium'}
              color="dark.1"
              maxWidth={736}
              width={'100%'}
            >
              {t('solution.accessMessage')}
            </Typography>
          </LandingContainer>
        </Stack>

        <LandingContainer alignItems={'center'}>
          <Button
            href="/login"
            fullWidth={isMobile}
            size="large"
            endIcon={<Icon name="ArrowRightIcon" />}
          >
            {t('how.joinTo')} ChainMind
          </Button>
        </LandingContainer>
      </Stack>
    </Stack>
  );
};

export default Solution;
