import { mapPathToName } from '@/configs/sidebar';
import { mobileMenuToggle } from '@/lib/features/menu/menuSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { BulletIcon, BulletIconActive } from '@app-components/sidebar/Menu/Bullets';
import {
  activeStyle,
  type ItemType,
  type MenuItemProps,
} from '@app-components/sidebar/Menu/MenuItem';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface SubMenuItemProps extends Pick<MenuItemProps, 'isCollapsed' | 'subItems'> {
  open: boolean;
  isActive: (path: string | undefined) => boolean;
}

export const SubMenuItem = (props: SubMenuItemProps) => {
  const { isActive, open, subItems, isCollapsed } = props;
  const { t } = useTranslate();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();

  const checkActiveParent = (item: ItemType) => {
    return !!item?.items?.length && !!item.items?.find((s) => isActive(s?.path));
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {subItems?.map((subItem) => (
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
                {isActive(subItem.path) || checkActiveParent(subItem) ? (
                  <BulletIconActive />
                ) : (
                  <BulletIcon />
                )}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{ ml: 1 }}
              slotProps={{
                primary: {
                  variant: 'p2-regular',
                  color:
                    isActive(subItem.path) || checkActiveParent(subItem) ? 'white' : 'grey.light',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                },
              }}
              primary={t(`sidebar.${(mapPathToName as any)[subItem.path]}` as any) || subItem.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Collapse>
  );
};
