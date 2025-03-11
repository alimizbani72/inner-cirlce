'use client';

import { List, ListSubheader } from '@mui/material';
import type { FC } from 'react';
import { mapPathToName, type sidebarServicesItems } from '@/configs/sidebar';
import MenuItem from './MenuItem';
import { useTranslate } from '@/locales';
import type { IconNames } from '@/components/icon/types';

type MenuProps = {
  name: string;
  items: typeof sidebarServicesItems;
  isCollapsed?: boolean;
};

const Menu: FC<MenuProps> = ({ name, items, isCollapsed }) => {
  const { t } = useTranslate();

  return (
    <List
      component="nav"
      disablePadding
      aria-labelledby="nested-list-subheader"
      sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}
      subheader={
        <ListSubheader
          disableSticky
          component="p"
          sx={{
            px: isCollapsed ? 1 : 2,
            lineHeight: 2.5,
            typography: 'caption-semi-bold',
            textTransform: 'uppercase',
            letterSpacing: '2.88px',
            color: 'grey.dark',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {name}
        </ListSubheader>
      }
    >
      {items.map(({ path, items, icon, name, mainSlug }: any) => (
        <MenuItem
          key={path ?? icon}
          route={path}
          label={
            name ? t(`sidebar.${name}` as any) : t(`sidebar.${(mapPathToName as any)[path]}` as any)
          }
          subItems={items}
          isCollapsed={isCollapsed}
          icon={icon as IconNames}
          mainSlug={mainSlug}
        />
      ))}
    </List>
  );
};

export default Menu;
