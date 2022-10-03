import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PasswordHealthState {
  entropy: string;
}

const initialState: PasswordHealthState = {
  entropy: "zxcvbn",
};

export const passHealthSlice = createSlice({
  name: "passwordHealth",
  initialState,
  reducers: {
    changeEntropy: (
      state: PasswordHealthState,
      action: PayloadAction<string>
    ) => ({ ...state, entropy: action.payload }),
  },
});

export const { changeEntropy } = passHealthSlice.actions;
export default passHealthSlice.reducer;
