import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface TimerSliceState {
  value: number;
}

const initialState: TimerSliceState = {
  value: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: (create) => ({
    setCoinsTimer: create.reducer((state, action: PayloadAction<number>) => {
      state.value = action.payload;
    }),
  }),
  selectors: {
    selectCoinsTimer: (counter) => counter.value,
  },
});

export const { setCoinsTimer } = timerSlice.actions;

export const { selectCoinsTimer } = timerSlice.selectors;
