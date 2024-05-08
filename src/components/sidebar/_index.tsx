import { List, ListSubheader } from "@mui/material";
import type { FC } from "react";
// import { mapPathToName, sidebarItems } from "src/configs/sidebar";
// import MenuItems from "./MenuItems";
// import type { iconsType } from "../icons/iconsNames";

type SidebarProps = {};
const Sidebar: FC<SidebarProps> = () => {
  return (
    <List
      sx={{ bgcolor: "dark.2" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader disableSticky component="div" sx={{ lineHeight: 2.5 }}>
          {/*  */}
        </ListSubheader>
      }
    >
      {/* {sidebarItems.map(({ path, items, icon }: any) => (
        <MenuItems
          key={path ?? ""}
          route={path}
          label={(mapPathToName as any)[path]}
          subItems={items}
          icon={icon as iconsType}
        />
      ))} */}
    </List>
  );
};

export default Sidebar;
