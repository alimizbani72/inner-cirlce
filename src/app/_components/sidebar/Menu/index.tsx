import { List, ListSubheader } from "@mui/material";
import type { FC } from "react";
import { mapPathToName, type sidebarServicesItems } from "src/configs/sidebar";
import MenuItem from "./MenuItem";
import type { iconsType } from "src/components/icons/iconsNames";

type MenuProps = {
  name: string;
  items: typeof sidebarServicesItems;
};

const Menu: FC<MenuProps> = ({ name, items }) => {
  return (
    <List
      component="nav"
      disablePadding
      aria-labelledby="nested-list-subheader"
      sx={{ gap: 1, display: "flex", flexDirection: "column" }}
      subheader={
        <ListSubheader
          disableSticky
          component="p"
          sx={{
            px: 2,
            lineHeight: 2.5,
            typography: "caption-semi-bold",
            textTransform: "uppercase",
            letterSpacing: "2.88px",
            color: "grey.dark",
          }}
        >
          {name}
        </ListSubheader>
      }
    >
      {items.map(({ path, items, icon, name }: any) => (
        <MenuItem
          key={path ?? icon}
          route={path}
          label={name ?? (mapPathToName as any)[path]}
          subItems={items}
          icon={icon as iconsType}
        />
      ))}
    </List>
  );
};

export default Menu;
