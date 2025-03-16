import { Stack } from '@mui/material';
import TelegramChannelSection from './_section';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Telegram Channel',
};
const TelegramChannel = () => {
  return (
    <Stack p={{ md: 4, xs: 3 }}>
      <TelegramChannelSection />
    </Stack>
  );
};

export default TelegramChannel;
