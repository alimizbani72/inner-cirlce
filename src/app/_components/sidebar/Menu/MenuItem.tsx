"use client";

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { FC } from "react";
import { useBoolean } from "src/hooks/use-boolean";
import { Icon } from "../../../../components/icons";
import type { iconsType } from "../../../../components/icons/iconsNames";
import { usePathname, useRouter } from "next/navigation";
import { mapPathToName } from "src/configs/sidebar";
import { BulletIcon, BulletIconActive } from "./Bullets";

type MenuItemProps = {
  icon: iconsType;
  route: string | undefined;
  label: string;
  subItems: { path: string }[] | undefined;
};

const activeStyle = {
  backgroundColor: "dark.3",
  borderColor: "dark.2",
  boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
};

const MenuItem: FC<MenuItemProps> = ({ icon, label, subItems, route }) => {
  const open = useBoolean();
  const pathname = usePathname();
  const { push } = useRouter();
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
        onClick={Array.isArray(subItems) ? open.onToggle : () => push(`/dashboard/${route ?? ""}`)}
      >
        <ListItemIcon sx={{ mr: 1 }}>
          {/* FIXME: fix the color icon */}
          <Icon
            name={icon as iconsType}
            color={(Array.isArray(subItems) ? open.value : isActive(route)) ? undefined : "grey.light"}
          />
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            variant: "p2-regular",
            color: (Array.isArray(subItems) ? open.value : isActive(route)) ? "white" : "grey.light",
          }}
          primary={label}
        />
        {Array.isArray(subItems) && (open.value ? <Icon name="Arrow-up" /> : <Icon name="Arrow-down" />)}
      </ListItemButton>

      {Array.isArray(subItems) ? (
        <Collapse in={open.value} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItemButton
                key={subItem.path}
                onClick={() => push(`/dashboard/${subItem.path}`)}
                sx={{ borderRadius: 3, ...(isActive(route) && activeStyle) }}
              >
                <ListItemIcon sx={{ mr: 1 }}>{isActive(route) ? <BulletIconActive /> : <BulletIcon />}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: "p2-regular", color: isActive(route) ? "white" : "grey.light" }}
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
