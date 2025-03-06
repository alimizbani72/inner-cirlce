import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PageSliceState {
  title: string;
  hasBackButton: boolean;
}

const initialState: PageSliceState = {
  title: '',
  hasBackButton: false,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: (create) => ({
    setPageInfo: create.reducer(
      (state, action: PayloadAction<{ title: string; hasBackButton?: boolean }>) => {
        state.title = action.payload.title;
        state.hasBackButton = !!action.payload.hasBackButton;
      }
    ),
  }),
  selectors: {
    pageTitle: (state) => state.title,
    pageHasBackButton: (state) => state.hasBackButton,
  },
});

export const { setPageInfo } = pageSlice.actions;

export const { pageTitle, pageHasBackButton } = pageSlice.selectors;
