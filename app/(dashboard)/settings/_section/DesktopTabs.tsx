'use client';

import Icon from '@/components/icon';
import Link from '@/components/link';
import { useActiveLink } from '@/routes/hooks';
import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';

type DesktopTabsProps = {
  href: string;
  icon: string;
  title: string;
};

const DesktopTabs: FC<DesktopTabsProps> = ({ href, icon, title }) => {
  const isActive = useActiveLink(`settings/${href}`);

  return (
    <Stack
      direction="row"
      gap={1}
      component={isActive ? 'div' : Link}
      href={`/settings/${href}`}
      sx={{
        py: 1,
        px: 2,
        borderRadius: '20px',
        border: '1px solid',
        color: 'transparent',
        ...(isActive
          ? {
              borderColor: 'dark.2',
              bgcolor: 'dark.3',
              boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.16)',
            }
          : {
              'svg path, svg rect,svg ellipse': { stroke: 'rgb(151, 153, 180)' },
            }),
      }}
    >
      <Icon name={`${icon}${isActive ? 'fillIcon' : 'Icon'}` as any} />
      <Typography variant="p2-medium" color={isActive ? 'white' : 'grey.light'}>
        {title}
      </Typography>
    </Stack>
  );
};

export default DesktopTabs;
