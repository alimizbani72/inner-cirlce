"use client";

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useCallback, type FC } from "react";
import { useBoolean } from "@/hooks/use-boolean";
import { usePathname } from "next/navigation";
import { mapPathToName } from "@/configs/sidebar";
import { BulletIcon, BulletIconActive } from "./Bullets";
import { useAppRouter } from "@/routes/hooks/use-router";
import { useAppDispatch } from "@/lib/hooks";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import type { iconsType } from "@/components/icons/iconsNames";
import { Icon } from "@/components/icons";

type MenuItemProps = {
  icon: iconsType;
  route: string | undefined;
  label: string;
  subItems: { path: string }[] | undefined;
  isCollapsed?: boolean;
};

const activeStyle = {
  backgroundColor: "dark.3",
  borderColor: "dark.2",
  boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
};

const MenuItem: FC<MenuItemProps> = ({ icon, label, subItems, route, isCollapsed }) => {
  const pathname = usePathname();
  const { push } = useAppRouter();
  const dispatch = useAppDispatch();
  const isActive = useCallback((path: string | undefined) => pathname.slice(4) === path, [pathname]);

  const open = useBoolean(!!subItems?.find((s) => isActive(s.path)));

  if (subItems && !subItems.length) {
    return null;
  }

  return (
    <Box>
      <ListItemButton
        sx={{
          borderRadius: 3,
          border: "1px solid",
          ...(isActive(route) && activeStyle),
          ...(open.value && {
            backgroundColor: "dark.1",
            borderColor: "dark.3",
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
          }),
        }}
        onClick={
          Array.isArray(subItems)
            ? open.onToggle
            : () => {
                if (!isActive(route)) {
                  push(`/${route ?? ""}`);
                }

                dispatch(mobileMenuToggle(false));
              }
        }
      >
        <ListItemIcon sx={{ mr: 0 }}>
          <Icon
            name={((Array.isArray(subItems) ? open.value : isActive(route)) ? `${icon}--colorful` : icon) as iconsType}
          />
        </ListItemIcon>

        {!isCollapsed && (
          <ListItemText
            sx={{ ml: 1 }}
            primaryTypographyProps={{
              variant: "p2-regular",
              color: (Array.isArray(subItems) ? open.value : isActive(route)) ? "white" : "grey.light",
            }}
            primary={label}
          />
        )}
        {Array.isArray(subItems) &&
          !isCollapsed &&
          (open.value ? <Icon name="Arrow-up" /> : <Icon name="Arrow-down" />)}
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
                sx={{ borderRadius: 3, ...(isActive(subItem.path) && activeStyle) }}
              >
                {!isCollapsed && (
                  <ListItemIcon sx={{ mr: 0 }}>
                    {isActive(subItem.path) ? <BulletIconActive /> : <BulletIcon />}
                  </ListItemIcon>
                )}
                <ListItemText
                  sx={{ ml: 1 }}
                  primaryTypographyProps={{
                    variant: "p2-regular",
                    color: isActive(subItem.path) ? "white" : "grey.light",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                  primary={(mapPathToName as any)[subItem.path]}
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
