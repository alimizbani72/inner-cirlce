'use client';

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useCallback, type FC } from 'react';
import { useBoolean } from '@/hooks/use-boolean';
import { usePathname } from 'next/navigation';
import { mapPathToName } from '@/configs/sidebar';
import { BulletIcon, BulletIconActive } from './Bullets';
import { useAppRouter } from '@/routes/hooks/use-router';
import { useAppDispatch } from '@/lib/hooks';
import { mobileMenuToggle } from '@/lib/features/menu/menuSlice';
import { useTranslate } from '@/locales';
import Icon from '@/components/icon';
import type { IconNames } from '@/components/icon/types';
import { normalize } from '@/utils/path';

type MenuItemProps = {
  icon: IconNames;
  route: string | undefined;
  label: string;
  subItems: { path: string; name: string }[] | undefined;
  isCollapsed?: boolean;
  mainSlug?: string;
};

const activeStyle = {
  backgroundColor: 'dark.3',
  borderColor: 'dark.2',
  boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.16)',
};

const MenuItem: FC<MenuItemProps> = ({ icon, label, subItems, route, isCollapsed, mainSlug }) => {
  const { t } = useTranslate();
  const pathname = usePathname();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();

  const isActive = useCallback(
    (path: string | undefined) =>
      mainSlug ? pathname.includes(mainSlug) : normalize(pathname) === normalize(`/${path}`),
    [pathname]
  );

  const open = useBoolean(!!subItems?.find((s) => isActive(s.path)));

  if (subItems && !subItems.length) {
    return null;
  }

  const isActiveSubItem = !!subItems?.find((s) => isActive(s.path));

  return (
    <Box>
      <ListItemButton
        sx={{
          ':hover': {
            backgroundColor: 'unset',
          },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'dark.1',
          ...(isActive(route) && activeStyle),
          ...(open.value &&
            isActiveSubItem && {
              backgroundColor: 'dark.1',
              borderColor: 'dark.3',
              boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.16)',
            }),
        }}
        onClick={
          Array.isArray(subItems)
            ? open.onToggle
            : () => {
                if (!isActive(route)) {
                  push(`/${route ?? ''}`);
                }

                dispatch(mobileMenuToggle(false));
              }
        }
      >
        <ListItemIcon sx={{ mr: 0 }}>
          <Icon
            stroke={isActive(route) ? '' : 'grey.light'}
            name={
              ((isActiveSubItem ? open.value : isActive(route))
                ? `${icon}fillIcon`
                : `${icon}Icon`) as IconNames
            }
          />
        </ListItemIcon>

        {!isCollapsed && (
          <ListItemText
            sx={{ ml: 1 }}
            slotProps={{
              primary: {
                variant: 'p2-regular',
                color: (isActiveSubItem ? open.value : isActive(route)) ? 'white' : 'grey.light',
              },
            }}
            primary={label}
          />
        )}
        {Array.isArray(subItems) &&
          !isCollapsed &&
          (open.value ? <Icon name="ArrowUpIcon" /> : <Icon name="ArrowDownIcon" />)}
      </ListItemButton>

      {Array.isArray(subItems) ? (
        <Collapse in={open.value} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItemButton
                key={subItem.path}
                onClick={() => {
                  if (!isActive(subItem.path)) {
                    push(`/${subItem.path}`);
                  }
                  dispatch(mobileMenuToggle(false));
                }}
                sx={{
                  borderRadius: 3,
                  mt: 1,
                  ...(isActive(subItem.path) && activeStyle),
                  ...(isCollapsed && { p: 1, whiteSpace: 'nowrap' }),
                }}
              >
                {!isCollapsed && (
                  <ListItemIcon sx={{ mr: 0 }}>
                    {isActive(subItem.path) ? <BulletIconActive /> : <BulletIcon />}
                  </ListItemIcon>
                )}
                <ListItemText
                  sx={{ ml: 1 }}
                  slotProps={{
                    primary: {
                      variant: 'p2-regular',
                      color: isActive(subItem.path) ? 'white' : 'grey.light',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    },
                  }}
                  primary={
                    t(`sidebar.${(mapPathToName as any)[subItem.path]}` as any) || subItem.name
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      ) : null}
    </Box>
  );
};

export default MenuItem;
