import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MenuSliceState {
  mobileMenuStatus: boolean;
}

const initialState: MenuSliceState = {
  mobileMenuStatus: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: (create) => ({
    mobileMenuToggle: create.reducer((state, action: PayloadAction<boolean>) => {
      state.mobileMenuStatus = action.payload;
    }),
  }),
  selectors: {
    isMobileMenuOpened: (sidebar) => sidebar.mobileMenuStatus,
  },
});

export const { mobileMenuToggle } = menuSlice.actions;

export const { isMobileMenuOpened } = menuSlice.selectors;
