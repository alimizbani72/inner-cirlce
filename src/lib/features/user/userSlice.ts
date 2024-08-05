import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Dictionary = {
  [key: string]: { [key: string]: string };
};

export interface IUser {
  id: string;
  email: string;
  avatar_url: string;
  full_name: string;
  kyc_status: boolean;
  plan_type: string;
  rank_type: string;
  has_2fa: boolean;
  banned: boolean;
  suspended: boolean;
}

interface UserSliceState {
  user: IUser | null;
}

const initialState: UserSliceState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    modifyUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  selectors: {
    selectUser: (state) => state.user,
  },
});

export const { initializeUser, modifyUser } = userSlice.actions;

export const { selectUser } = userSlice.selectors;
