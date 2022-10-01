import {
  applyMiddleware,
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";
import configReducer from "../features/pass-config/configSlice";
import passwordReducer from "../features/pass-generator/passwordSlice";
import settingsReducer from "../features/appbar-settings/settingsSlice";

const rootReducer = combineReducers({
  config: configReducer,
  passwordGenerator: passwordReducer,
  settings: settingsReducer,
});

export const saveOptions = { states: ["config", "settings"] };

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    enhancers: [applyMiddleware(save(saveOptions))],
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore(load(saveOptions));
