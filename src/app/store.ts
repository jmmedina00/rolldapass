import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import configReducer from "../features/pass-config/configSlice";
import passwordReducer from "../features/pass-generator/passwordSlice";
import settingsReducer from "../features/appbar-settings/settingsSlice";

const rootReducer = combineReducers({
  config: configReducer,
  passwordGenerator: passwordReducer,
  settings: settingsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
