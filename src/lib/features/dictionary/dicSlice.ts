import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Dictionary = {
  [key: string]: { [key: string]: string };
};

export interface DicSliceState {
  dict: Dictionary;
  currentLang: string;
}

const initialState: DicSliceState = {
  dict: {},
  currentLang: "en",
};

export const dicSlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: (create) => ({
    initializeDic: create.reducer((state, action: PayloadAction<DicSliceState>) => {
      return { ...state, ...action.payload };
    }),
  }),
  selectors: {
    selectDict: (state) => state.dict,
    selectLang: (state) => state.currentLang,
  },
});

export const { initializeDic } = dicSlice.actions;

export const { selectDict, selectLang } = dicSlice.selectors;
