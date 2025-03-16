import { Box, Container, Stack } from '@mui/material';

import Link from '@/components/link';
import TextureBox from '@app-components/TextureBox';
import type { ReactNode } from 'react';
import GoogleOneTap from '@/components/google-one-tap';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Stack direction={'row'}>
      <Box
        sx={{
          height: '100dvh',
          overflowY: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            height: '100%',
            minHeight: '100dvh',
          }}
        >
          <Stack
            sx={{ height: '100%', width: '100%', position: 'relative' }}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Stack
              sx={{ width: '100%', height: '100%', py: 5, maxWidth: '400px' }}
              justifyContent={'space-between'}
              spacing={4}
            >
              <Box sx={{ height: 48 }}>
                <Link href={'/'}>
                  <img
                    src="/logo/logo-type.svg"
                    alt="chainmind logo"
                    style={{ width: '180px', height: '48px', alignSelf: 'flex-start' }}
                  />
                </Link>
              </Box>
              <GoogleOneTap />
              {children}
              <Box />
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box display={{ xs: 'none', md: 'block' }} sx={{ flex: 1 }}>
        <TextureBox>
          <Stack spacing={2} sx={{ px: 8 }}></Stack>
        </TextureBox>
      </Box>
    </Stack>
  );
}
