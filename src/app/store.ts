import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import configReducer from "../features/pass-config/configSlice";
import passwordReducer from "../features/pass-generator/passwordSlice";

const rootReducer = combineReducers({
  config: configReducer,
  passwordGenerator: passwordReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
