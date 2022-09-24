import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import configReducer from "../features/pass-config/configSlice";

const rootReducer = combineReducers({ config: configReducer });

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
