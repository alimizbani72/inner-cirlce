'use client';

import { isMobileMenuOpened, mobileMenuToggle } from '@/lib/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Drawer } from '@mui/material';
import MobileSidebar from './Mobile';

const MobileDrawer = () => {
  const isMenuOpened = useAppSelector(isMobileMenuOpened);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    dispatch(mobileMenuToggle(false));
  };
  return (
    <Drawer
      variant="temporary"
      open={isMenuOpened}
      onClose={handleDrawerToggle}
      // ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '100%',
          bgcolor: 'dark.2',
          boxShadow: 'none',
        },
      }}
    >
      <MobileSidebar />
    </Drawer>
  );
};
export default MobileDrawer;
