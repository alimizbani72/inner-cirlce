import Icon from '@/components/icon';
import { Box, Stack, Typography } from '@mui/material';

const SideBarLoading = () => {
  return (
    <Stack gap={1}>
      <Typography
        textTransform={'uppercase'}
        color="grey.dark"
        variant="caption-semi-bold"
        sx={{ lineHeight: 2.5, letterSpacing: '2.88px' }}
        pl={2}
      >
        community
      </Typography>
      <Box width={'100%'} height={'42px'} className="loading-skeleton" borderRadius={4} />
      <Box
        sx={{
          width: '100%',
          py: 1,
          border: '1px solid',
          borderColor: 'dark.1',
          borderRadius: 4,
          display: 'flex',
          direction: 'row',
          gap: 1,
        }}
        pl={2}
      >
        <Icon name="SettingIcon" stroke="grey.light" />
        <Typography variant="p2-regular" color="grey.light">
          Settings
        </Typography>
      </Box>
    </Stack>
  );
};

export default SideBarLoading;
