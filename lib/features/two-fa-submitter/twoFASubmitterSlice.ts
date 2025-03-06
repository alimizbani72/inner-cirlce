import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TwoFASubmitterSliceState {
  isOpen: boolean;
  otp: string | null;
}

const initialState: TwoFASubmitterSliceState = {
  isOpen: false,
  otp: null,
};

export const twoFASubmitterSlice = createSlice({
  name: 'twoFASubmitter',
  initialState,
  reducers: {
    twoFASubmitterOpen: (state) => {
      state.isOpen = true;
    },
    twoFASubmitterClose: (state) => {
      state.isOpen = false;
    },
    twoFASubmitterClearOTP: (state) => {
      state.otp = null;
    },
    twoFASubmitterOTPSet: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
      state.isOpen = false;
    },
  },
  selectors: {
    selectTwoFASubmitterOpen: (state) => state.isOpen,
    selectTwoFASubmitterOTP: (state) => state.otp,
  },
});

export const {
  twoFASubmitterClose,
  twoFASubmitterOpen,
  twoFASubmitterOTPSet,
  twoFASubmitterClearOTP,
} = twoFASubmitterSlice.actions;
export const { selectTwoFASubmitterOTP, selectTwoFASubmitterOpen } = twoFASubmitterSlice.selectors;
