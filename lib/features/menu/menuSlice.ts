import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MenuSliceState {
  sidebarCollapseStatus: boolean;
  mobileMenuStatus: boolean;
}

const initialState: MenuSliceState = {
  sidebarCollapseStatus: false,
  mobileMenuStatus: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: (create) => ({
    sidebarToggle: create.reducer((state) => {
      state.sidebarCollapseStatus = !state.sidebarCollapseStatus;
    }),
    mobileMenuToggle: create.reducer((state, action: PayloadAction<boolean>) => {
      state.mobileMenuStatus = action.payload;
    }),
  }),
  selectors: {
    isSidebarCollapsed: (sidebar) => sidebar.sidebarCollapseStatus,
    isMobileMenuOpened: (sidebar) => sidebar.mobileMenuStatus,
  },
});

export const { sidebarToggle, mobileMenuToggle } = menuSlice.actions;

export const { isSidebarCollapsed, isMobileMenuOpened } = menuSlice.selectors;
