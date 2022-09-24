import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PasswordState {
  password: string;
}

const initialState: PasswordState = {
  password: "",
};

export const passwordSlice = createSlice({
  name: "passwordGenerator",
  initialState,
  reducers: {
    changePassword: (state: PasswordState, action: PayloadAction<string>) => ({
      ...state,
      password: action.payload,
    }),
  },
});

export const { changePassword } = passwordSlice.actions;
export default passwordSlice.reducer;
