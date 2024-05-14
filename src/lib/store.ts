import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { dicSlice } from "./features/dictionary/dicSlice";

const rootReducer = combineSlices(counterSlice, menuSlice, dicSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => configureStore({ reducer: rootReducer });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
