import { Menu, type MenuProps } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';
type Props = {
  width?: string | number;
} & PropsWithChildren<MenuProps>;
const CustomMenu: FC<Props> = ({ children, width, ...props }) => {
  return (
    <Menu
      disableScrollLock={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'dark.2',
          color: 'white',
          boxShadow: '0px 16px 32px 0px rgba(0, 0, 0, 0.16)',
          border: '1px solid',
          borderColor: 'dark.3',
          backgroundImage: 'none',
          width: width,
          p: 2,
        },
      }}
      {...props}
    >
      {children}
    </Menu>
  );
};

export default CustomMenu;
