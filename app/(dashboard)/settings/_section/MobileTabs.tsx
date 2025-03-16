import Icon from '@/components/icon';
import { useActiveLink } from '@/routes/hooks';
import { Box, Divider, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

type DesktopTabsProps = {
  href: string;
  icon: string;
  title: string;
  isLastOne: boolean;
};

const Mobiletabs: FC<DesktopTabsProps> = ({ href, icon, title, isLastOne }) => {
  const isActive = useActiveLink(`settings/${href}`);
  return (
    <Stack width={1}>
      <Stack
        direction={'row'}
        gap={1}
        alignItems={'center'}
        sx={{
          width: '100%',
          p: 1,
          ...(!isActive ? { 'svg path': { stroke: 'rgb(151, 153, 180)' } } : {}),
        }}
      >
        <Icon name={`${icon}${isActive ? 'fillIcon' : 'Icon'}` as any} />
        <Typography variant="p2-medium" color={isActive ? 'white' : 'grey.light'}>
          {title}
        </Typography>

        {isActive && (
          <Box sx={{ ml: 'auto' }}>
            <Icon name="CheckIcon" stroke="pink.dark" />
          </Box>
        )}
      </Stack>
      {isLastOne && <Divider flexItem />}
    </Stack>
  );
};

export default Mobiletabs;
