import { Menu, MenuItem, type MenuProps } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

const CustomMenu: FC<PropsWithChildren<MenuProps>> = ({ children, ...props }) => {
  return (
    <Menu
      disableScrollLock={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "dark.2",
          color: "white",
          boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.16)",
          mr: 3,
          border: "1px solid",
          borderColor: "dark.3",
          backgroundImage: "none",
          p: 2,
          gap: 2,
        },
      }}
      {...props}
    >
      <MenuItem>{children}</MenuItem>
    </Menu>
  );
};

export default CustomMenu;
