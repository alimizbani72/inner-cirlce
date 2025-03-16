'use client';
import { useIsMobile } from '@/hooks/use-responsive';
import { Stack, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';

const mapPathToName = {
  disclaimer: 'Disclaimer',
  imprint: 'Imprint',
  'terms-and-condition': 'Terms & Conditions',
  'privacy-policy': 'Privacy Policy',
};

const TermsBanner = () => {
  const isMobile = useIsMobile();
  const pathName = usePathname();

  return (
    <Stack
      sx={{ background: (theme) => theme.palette.gradient.blue, py: isMobile ? 3 : 5 }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant={isMobile ? 'h3-bold' : 'h1-bold'}>
        {
          mapPathToName[
            Object.keys(mapPathToName).find((item) =>
              pathName.includes(item)
            ) as keyof typeof mapPathToName
          ]
        }
      </Typography>
    </Stack>
  );
};

export default TermsBanner;
