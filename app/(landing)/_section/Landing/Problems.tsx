import type { FC } from 'react';
import LandingContainer from './LandingContainer';
import { Box, Button, Typography } from '@mui/material';
import { useIsMobile } from '@/hooks/use-responsive';

import { Stack } from '@mui/system';
import { CMSDownloadURL } from '@/consts';
import type { Media } from '@/services/cms/chainmindCms.schemas';
import { Image } from '@/components/image';
import Icon from '@/components/icon';

interface ProblemsProps {
  highlightText: string;
  coloredTitle: string;
  buttonText: string;
  buttonLink: string;
  gridSections: Array<{
    icon: Media;
    title: string;
    description: string;
    id?: string | null;
  }>;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Problem';
  isLoading: boolean;
}

const Problems: FC<ProblemsProps> = ({
  blockType,
  buttonLink,
  buttonText,
  coloredTitle,
  gridSections,
  highlightText,
  isLoading,
}) => {
  const isMobile = useIsMobile();

  return (
    <LandingContainer
      gap={{ md: 8, xs: 4 }}
      my={{ md: 12, xs: 8 }}
      py={{ md: 12, xs: 8 }}
      alignItems={'center'}
      position={'relative'}
      overflow={'hidden'}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.16 }}>
        <img
          src="/assets/svg/checkout-texture.svg"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          height: 609,
          opacity: 0.16,
        }}
      >
        <img
          src="/assets/svg/payment-stars.svg"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255, 87, 87, 0.24) 0%, rgba(7, 7, 32, 0.00) 100%)',
          width: 968,
          height: 968,
          borderRadius: '968px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(140px)',
        }}
      />

      <Stack gap={3} alignItems={'center'} position={'relative'} zIndex={4}>
        <Typography
          variant="p2-semi-bold"
          sx={{
            background: (theme) => theme.palette.gradient.orange,
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            minWidth: 60,
            minHeight: 24,
          }}
          className={isLoading ? 'loading-skeleton' : ''}
        >
          {blockType}
        </Typography>

        <Typography
          variant={isMobile ? 'h3-medium' : 'h1-medium'}
          textAlign={'center'}
          textTransform="capitalize"
          sx={{
            minWidth: { xs: 300, md: 600 },
            minHeight: { xs: 40, md: 128 },
          }}
          className={isLoading ? 'loading-skeleton' : ''}
        >
          {highlightText}
          {isMobile ? ' ' : <br />}
          <Typography variant={isMobile ? 'h3-medium' : 'h1-medium'} color="danger.main">
            {coloredTitle}
          </Typography>
        </Typography>
      </Stack>

      <Stack
        direction={{ md: 'row' }}
        flexWrap={{ md: 'wrap' }}
        position={'relative'}
        zIndex={4}
        gap={{ md: 4, xs: 2 }}
        width="100%"
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                flex={{ md: '1 1 calc(50% - 32px)' }}
                minHeight={{ xs: 180, sm: 160, lg: 130 }}
                className={'loading-skeleton'}
              />
            ))
          : gridSections?.map((item) => (
              <Stack
                key={item.id}
                direction={{ md: 'row' }}
                p={{ md: 4, xs: 3 }}
                gap={{ md: 3, xs: 2 }}
                borderRadius={2}
                border={'1px solid'}
                borderColor={'dark.3'}
                bgcolor={'dark.2'}
                flex={{ md: '1 1 calc(50% - 32px)' }}
                alignItems={{ md: 'center' }}
              >
                <Stack
                  alignItems={'center'}
                  justifyContent={'center'}
                  width={{ md: 64, xs: 56 }}
                  height={{ md: 64, xs: 56 }}
                  bgcolor={'dark.3'}
                  borderRadius={1.5}
                >
                  <Image
                    src={CMSDownloadURL(item?.icon?.url!)}
                    width={isMobile ? 32 : 40}
                    height={isMobile ? 32 : 40}
                  />
                </Stack>
                <Typography flex={1} variant="h4-regular">
                  {item.title}
                </Typography>
              </Stack>
            ))}
      </Stack>

      {isLoading ? (
        <Box className="loading-skeleton" width={200} height={48} />
      ) : (
        <Button
          href={buttonLink}
          fullWidth={isMobile}
          size="large"
          endIcon={<Icon name="ArrowRightIcon" />}
          sx={{ position: 'relative', zIndex: 4 }}
        >
          {buttonText}
        </Button>
      )}
    </LandingContainer>
  );
};

export default Problems;
