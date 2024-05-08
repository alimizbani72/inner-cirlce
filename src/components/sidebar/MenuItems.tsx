"use client";

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { FC } from "react";
import { useBoolean } from "src/hooks/use-boolean";
import { Icon } from "../icons";
import type { iconsType } from "../icons/iconsNames";
import { useRouter } from "next/navigation";

type MenuItemsProps = {
  icon: iconsType;
  route: string | undefined;
  label: string;
  subItems:
    | {
        label: string;
        name: string;
        permission: string;
      }[]
    | undefined;
};

const MenuItems: FC<MenuItemsProps> = ({ icon, label, subItems, route }) => {
  const open = useBoolean();
  const { push } = useRouter();

  if (subItems && !subItems.length) {
    return null;
  }

  return (
    <Box>
      <ListItemButton
        divider={open.value}
        onClick={Array.isArray(subItems) ? open.onToggle : () => push(`/dashboard/${route ?? ""}`)}
      >
        <ListItemIcon>
          <Icon name={icon as iconsType} />
        </ListItemIcon>

        <ListItemText primaryTypographyProps={{ variant: "p2-regular" }} sx={{ color: "grey.light" }} primary={label} />
        {Array.isArray(subItems) && (open.value ? <Icon name="Arrow-up" /> : <Icon name="Arrow-down" />)}
      </ListItemButton>

      {Array.isArray(subItems) ? (
        <Collapse in={open.value} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem) => (
              <ListItemButton key={subItem.name} onClick={() => push(`/dashboard/${route}/${subItem.name}`)}>
                <ListItemIcon>
                  {/* <Icon name="color-dot-6" color={isActive(1, subItem.name) ? "primary.dark" : "icon.primary"} /> */}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: "p2-regular" }}
                  primary={subItem.label}
                  sx={{ color: "grey.light" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      ) : null}
    </Box>
  );
};

export default MenuItems;
