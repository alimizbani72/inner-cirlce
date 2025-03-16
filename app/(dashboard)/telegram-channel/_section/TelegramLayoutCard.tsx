import Icon from '@/components/icon';
import RiveComp from '@/components/rive-loader';
import { useIsMobile } from '@/hooks/use-responsive';
import { Box, Divider, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
type TelegramCardProps = {
  title: string;
  planTypeImg?: string | undefined;
  content: ReactNode;
  bgImage: string;
  premium?: string | undefined;
  features: string[];
  description: string;
};
const TelegramLayoutCard = ({
  title,
  bgImage,
  planTypeImg,
  content,
  premium,
  features,
  description,
}: TelegramCardProps) => {
  const isMobile = useIsMobile();
  return (
    <Stack
      spacing={2}
      sx={{ border: '1.5px solid', borderColor: 'dark.3', borderRadius: '12px' }}
      width={isMobile ? '327px' : '360px'}
    >
      <img src={bgImage} />
      <Stack spacing={3}>
        <Stack direction={{ md: 'row', xs: 'column' }} spacing={{ xs: 1, md: 3 }}>
          <Typography pl={3} variant="p1-medium">
            {title}
          </Typography>

          {!!premium && (
            <Stack
              sx={{
                ml: { xs: 3, md: 0 },
                width: 90,
                height: 24,
                borderRadius: 1.5,
                background: (theme) => theme.palette.gradient.orange,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography textTransform="uppercase" color="dark.1" variant="caption-semi-bold">
                {premium}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Divider />
        <Stack px={3} spacing={3}>
          <Stack direction={'row'} spacing={2}>
            {planTypeImg && (
              <Box sx={{ aspectRatio: 1 }}>
                <RiveComp src={planTypeImg} width={48} height={48} />
              </Box>
            )}
            <Typography variant="p2-regular">{description}</Typography>
          </Stack>
          {features.map((feature, index) => (
            <Stack key={index} direction={'row'} spacing={1.5}>
              <Icon name="CheckIcon" stroke="success.main" />
              <Typography variant="p2-regular">{feature}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider />
        <Stack px={3} pb={3}>
          {content}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TelegramLayoutCard;
