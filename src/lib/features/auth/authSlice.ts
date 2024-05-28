import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type RegisterInfo = {
  name: string;
  email: string;
  password: string;
};

type ForgotPasswordInfo = {
  email: string;
};

export interface authSliceState {
  register: RegisterInfo;
  forgotPassword: ForgotPasswordInfo;
  registerStep: number;
  forgotPasswordStep: number;
}

const initialState: authSliceState = {
  register: {
    name: "",
    email: "",
    password: "",
  },
  forgotPassword: {
    email: "",
  },
  registerStep: 1,
  forgotPasswordStep: 1,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterStep: (state, action: PayloadAction<number>) => {
      state.registerStep = action.payload;
    },
    setRegisterInfo: (state, action: PayloadAction<RegisterInfo>) => {
      state.register = action.payload;
    },
    setForgotPasswordStep: (state, action: PayloadAction<number>) => {
      state.forgotPasswordStep = action.payload;
    },
    setForgotPasswordInfo: (state, action: PayloadAction<ForgotPasswordInfo>) => {
      state.forgotPassword = action.payload;
    },
  },
  selectors: {
    getRegisterStep: (auth: authSliceState) => auth.registerStep,
    getRegisterInfo: (auth: authSliceState) => auth.register,
    getForgotPasswordStep: (auth: authSliceState) => auth.forgotPasswordStep,
    getForgotPasswordInfo: (auth: authSliceState) => auth.forgotPassword,
  },
});

export const { setRegisterInfo, setRegisterStep, setForgotPasswordInfo, setForgotPasswordStep } = authSlice.actions;

export const { getRegisterInfo, getRegisterStep, getForgotPasswordInfo, getForgotPasswordStep } = authSlice.selectors;
