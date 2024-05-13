"use client";

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { FC } from "react";
import { useBoolean } from "src/hooks/use-boolean";
import { Icon } from "../../../../components/icons";
import type { iconsType } from "../../../../components/icons/iconsNames";
import { usePathname } from "next/navigation";
import { mapPathToName } from "src/configs/sidebar";
import { BulletIcon, BulletIconActive } from "./Bullets";
import { useAppRouter } from "@/routes/hooks/use-router";
import { useAppDispatch } from "@/lib/hooks";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";

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
  const open = useBoolean();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { push } = useAppRouter();
  const isActive = (path: string | undefined) => pathname.replace("/dashboard/", "") === path;

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
                push(`/dashboard/${route ?? ""}`);
                dispatch(mobileMenuToggle(false));
              }
        }
      >
        <ListItemIcon sx={{ mr: 0 }}>
          {/* FIXME: fix the color icon */}
          <Icon
            name={icon as iconsType}
            color={(Array.isArray(subItems) ? open.value : isActive(route)) ? undefined : "grey.light"}
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
                  push(`/dashboard/${subItem.path}`);
                  dispatch(mobileMenuToggle(false));
                }}
                sx={{ borderRadius: 3, ...(isActive(route) && activeStyle) }}
              >
                {!isCollapsed && (
                  <ListItemIcon sx={{ mr: 0 }}>{isActive(route) ? <BulletIconActive /> : <BulletIcon />}</ListItemIcon>
                )}
                <ListItemText
                  sx={{ ml: 1 }}
                  primaryTypographyProps={{
                    variant: "p2-regular",
                    color: isActive(route) ? "white" : "grey.light",
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
