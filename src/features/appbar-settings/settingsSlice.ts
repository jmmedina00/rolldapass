import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  settingsOpen: boolean;
  aboutOpen: boolean;
  toggle: {
    [key: string]: boolean;
  };
}

const initialState: SettingsState = {
  settingsOpen: false,
  aboutOpen: false,
  toggle: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    openAbout: (state: SettingsState) => ({ ...state, aboutOpen: true }),
    closeAbout: (state: SettingsState) => ({ ...state, aboutOpen: false }),
    toggleDrawer: (state: SettingsState) => {
      const isOpen = !state.settingsOpen;
      return { ...state, settingsOpen: isOpen };
    },
    toggleSetting: (state: SettingsState, action: PayloadAction<string>) => {
      const setting = action.payload;
      const settingEnabled = state.toggle[setting] || false;
      return {
        ...state,
        toggle: { ...state.toggle, [setting]: !settingEnabled },
      };
    },
    initializeSetting: (
      state: SettingsState,
      action: PayloadAction<string>
    ) => ({ ...state, toggle: { ...state.toggle, [action.payload]: false } }),
  },
});

export const {
  openAbout,
  closeAbout,
  toggleDrawer,
  toggleSetting,
  initializeSetting,
} = settingsSlice.actions;
export default settingsSlice.reducer;
