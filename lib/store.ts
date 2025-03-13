import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { educationSlice } from './features/academy/educationSlice';
import { authSlice } from './features/auth/authSlice';
import { counterSlice } from './features/counter/counterSlice';
import { deviceSlice } from './features/device/deviceSlice';
import { dicSlice } from './features/dictionary/dicSlice';
import { menuSlice } from './features/menu/menuSlice';
import { pageSlice } from './features/pageTitle/pageSlice';
import { plansSlice } from './features/plans/plansSlice';
import { transactionSlice } from './features/portfolio/transactionSlice';
import { timerSlice } from './features/timer/timerSlice';
import { twoFASubmitterSlice } from './features/two-fa-submitter/twoFASubmitterSlice';
import { userSlice } from './features/user/userSlice';

const rootReducer = combineSlices(
  dicSlice,
  deviceSlice,
  counterSlice,
  menuSlice,
  dicSlice,
  pageSlice,
  authSlice,
  educationSlice,
  plansSlice,
  userSlice,
  twoFASubmitterSlice,
  transactionSlice,
  timerSlice
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => configureStore({ reducer: rootReducer });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
