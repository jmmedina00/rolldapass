import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PasswordState {
  password: string;
  copiedTimeout: number | undefined;
}

const initialState: PasswordState = {
  password: "",
  copiedTimeout: undefined,
};

export const passwordSlice = createSlice({
  name: "passwordGenerator",
  initialState,
  reducers: {
    changePassword: (state: PasswordState, action: PayloadAction<string>) => ({
      ...state,
      password: action.payload,
    }),
    setTimeoutId: (state: PasswordState, action: PayloadAction<number>) => ({
      ...state,
      copiedTimeout: action.payload,
    }),
    clearTimeoutId: (state: PasswordState) => ({
      ...state,
      copiedTimeout: undefined,
    }),
  },
});

export const { changePassword, setTimeoutId, clearTimeoutId } =
  passwordSlice.actions;
export default passwordSlice.reducer;
