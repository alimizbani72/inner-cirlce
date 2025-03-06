import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type RegisterInfo = {
  name: string;
  email: string;
  password: string;
};

type LoginInfo = {
  email: string;
  password: string;
};

type ForgotPasswordInfo = {
  email: string;
  token?: string;
  password?: string;
};

export interface authSliceState {
  register: RegisterInfo;
  login: LoginInfo;
  forgotPassword: ForgotPasswordInfo;
  registerStep: number;
  loginStep: number;
  forgotPasswordStep: number;
}

const initialState: authSliceState = {
  register: {
    name: '',
    email: '',
    password: '',
  },
  login: {
    email: '',
    password: '',
  },
  forgotPassword: {
    email: '',
    token: '',
  },
  registerStep: 1,
  loginStep: 1,
  forgotPasswordStep: 1,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegisterStep: (state, action: PayloadAction<number>) => {
      state.registerStep = action.payload;
    },
    setLoginStep: (state, action: PayloadAction<number>) => {
      state.loginStep = action.payload;
    },
    setRegisterInfo: (state, action: PayloadAction<RegisterInfo>) => {
      state.register = action.payload;
    },
    setLoginInfo: (state, action: PayloadAction<LoginInfo>) => {
      state.login = action.payload;
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
    getLoginStep: (auth: authSliceState) => auth.loginStep,
    getRegisterInfo: (auth: authSliceState) => auth.register,
    getLoginInfo: (auth: authSliceState) => auth.login,
    getForgotPasswordStep: (auth: authSliceState) => auth.forgotPasswordStep,
    getForgotPasswordInfo: (auth: authSliceState) => auth.forgotPassword,
  },
});

export const {
  setRegisterInfo,
  setLoginInfo,
  setRegisterStep,
  setLoginStep,
  setForgotPasswordInfo,
  setForgotPasswordStep,
} = authSlice.actions;

export const {
  getRegisterInfo,
  getLoginInfo,
  getRegisterStep,
  getLoginStep,
  getForgotPasswordInfo,
  getForgotPasswordStep,
} = authSlice.selectors;
