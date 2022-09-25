import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  settingsOpen: boolean;
  toggle: {
    [key: string]: boolean;
  };
}

const initialState: SettingsState = {
  settingsOpen: false,
  toggle: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
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
  },
});

export default settingsSlice.reducer;
