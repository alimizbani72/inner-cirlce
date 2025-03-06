import { useIsMobile } from '@/hooks/use-responsive';
import animationData from '@/assets/animations/IllustrationAnim.json';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import LandingContainer from '../LandingContainer';
import HiddenGems from './HiddenGems';
import Icon from '@/components/icon';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LandingHeroProps {
  highlightText: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Hero';
  isLoading: boolean;
}

const LandingHero: FC<LandingHeroProps> = ({
  buttonLink,
  buttonText,
  description,
  highlightText,
  title,
  isLoading,
}) => {
  const isMobile = useIsMobile();

  return (
    <LandingContainer
      minHeight={'calc(100vh - 105px)'}
      direction={{ md: 'row' }}
      gap={{ md: 10, xs: 6 }}
      py={{ md: 3, xs: 8 }}
      alignItems={'center'}
    >
      <Stack flex={1} alignItems={{ md: 'flex-start', xs: 'center' }} width="100%">
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ borderRadius: 1.5, backgroundColor: 'dark.3' }}
          px={1}
          height={24}
          mb={3}
        >
          <Typography
            variant="caption-semi-bold"
            sx={{
              background: (theme) => theme.palette.gradient.pink,
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
          >
            {isLoading ? (
              <Box className="loading-skeleton" width={112} height={20} />
            ) : (
              highlightText
            )}
          </Typography>
        </Stack>

        <Typography
          variant={isMobile ? 'h2-semi-bold' : 'h1-semi-bold'}
          mb={2}
          textAlign={{ md: 'left', xs: 'center' }}
          width="100%"
        >
          {isLoading ? (
            <Box
              className="loading-skeleton"
              width={'100%'}
              sx={{ height: { xs: 96, sm: 48, md: 128 } }}
            />
          ) : (
            title
          )}
        </Typography>
        <Typography
          variant={isMobile ? 'p2-regular' : 'p1-regular'}
          color="grey.light"
          textAlign={{ md: 'left', xs: 'center' }}
          className={isLoading ? 'loading-skeleton' : ''}
          width="100%"
        >
          {isLoading ? (
            <Box
              className="loading-skeleton"
              width={'100%'}
              sx={{ height: { xs: 48, sm: 24, md: 48 } }}
            />
          ) : (
            description
          )}
        </Typography>

        <Stack py={{ md: 5, xs: 3 }} width={'100%'} maxWidth={'100%'}>
          {isLoading ? (
            <Box className="loading-skeleton" width={'100%'} sx={{ height: { xs: 213, md: 98 } }} />
          ) : (
            <HiddenGems />
          )}
        </Stack>

        {isLoading ? (
          <Box className="loading-skeleton" width={200} height={48} />
        ) : (
          <Button
            href={buttonLink}
            fullWidth={isMobile}
            size="large"
            endIcon={<Icon name="ArrowRightIcon" />}
          >
            {buttonText}
          </Button>
        )}
      </Stack>
      <Stack flex={1} width={'100%'}>
        <Lottie
          animationData={animationData}
          className="flex justify-center items-center"
          loop={true}
        />
      </Stack>
    </LandingContainer>
  );
};

export default LandingHero;
