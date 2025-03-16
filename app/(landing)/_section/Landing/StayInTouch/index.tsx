import Icon from '@/components/icon';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import LandingContainer from '../LandingContainer';
import Starts from './Stars';

const StayInTouch = () => {
  const isMobile = useIsMobile();
  const [value, setValue] = useState('');
  const { t } = useTranslate();
  return (
    <LandingContainer alignItems="center" mb={4}>
      <Stack
        overflow={'hidden'}
        border="1.5px solid"
        borderColor="dark.3"
        borderRadius={2}
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.16)"
        maxWidth={928}
        width="100%"
      >
        <Stack
          sx={{
            background: 'linear-gradient(180deg, #565CE4 0%, rgba(7, 7, 32, 0.00) 100%)',
            px: 3,
            py: { md: 8, xs: 7 },
            position: 'relative',
          }}
          alignItems="center"
        >
          <Stack
            position={'absolute'}
            top={32}
            left={'50%'}
            sx={{ transform: 'translateX(-50%)', width: 824 }}
          >
            <Starts />
          </Stack>

          <Stack
            sx={{
              py: 0.5,
              px: 2,
              borderRadius: 3,
              backgroundColor: 'dark.2',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography
              textAlign="center"
              textTransform="uppercase"
              color="white"
              variant="caption-semi-bold"
            >
              {t('stayInTouch.stayUpdate')}
            </Typography>
          </Stack>

          <Typography
            textTransform="uppercase"
            color="white"
            textAlign="center"
            variant={isMobile ? 'h3-bold' : 'h2-bold'}
            sx={{
              background: (theme) => theme.palette.gradient.sky,
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              mb: 1,
            }}
          >
            {t('stayInTouch.title')}
          </Typography>
          <Typography textAlign="center" color="white" variant="p2-regular">
            {t('stayInTouch.description')}
          </Typography>
        </Stack>

        <Stack borderTop="1.5px solid" borderColor="dark.3">
          <TextField
            value={value}
            onChange={(event) => setValue(event.target.value)}
            sx={{
              fieldset: { display: 'none' },
              input: {
                textAlign: 'center',
                typography: 'h4-medium',
                '&::placeholder': { textTransform: 'uppercase', typography: 'h4-medium' },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    disabled={!value}
                    sx={{
                      path: { stroke: (theme) => (value ? theme.palette.blue.dark : undefined) },
                    }}
                  >
                    <Icon name="SendIcon" size={32} />
                  </IconButton>
                ),
              },
            }}
            type="email"
            placeholder={t('stayInTouch.emailPlaceholder')}
          />
        </Stack>
      </Stack>
    </LandingContainer>
  );
};

export default StayInTouch;
