import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { dicSlice } from "./features/dictionary/dicSlice";
import { pageSlice } from "./features/pageTitle/pageSlice";
import { authSlice } from "./features/auth/authSlice";
import { educationSlice } from "./features/academy/educationSlice";
import { plansSlice } from "./features/plans/plansSlice";

const rootReducer = combineSlices(counterSlice, menuSlice, dicSlice, pageSlice, authSlice, educationSlice, plansSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => configureStore({ reducer: rootReducer });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
