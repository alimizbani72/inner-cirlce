'use client';
import { Stack } from '@mui/material';
import AccountInfo from './AccountInfo';
import AccountContract from './AccountContract';

const BusinessInfo = () => {
  return (
    <Stack width={1} gap={2}>
      <Stack p={{ md: 4, xs: 3 }}>
        <AccountInfo />
      </Stack>
      <AccountContract />
    </Stack>
  );
};

export default BusinessInfo;
