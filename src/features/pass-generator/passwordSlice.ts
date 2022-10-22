import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkPassword } from "./services/haveIBeenPwned";

export interface PasswordState {
  password: string;
  copiedTimeout: number | undefined;
  pwnedResult: "none" | "pending" | "good" | "bad" | "error";
}

const initialState: PasswordState = {
  password: "",
  copiedTimeout: undefined,
  pwnedResult: "none",
};

export const checkIfPwned = createAsyncThunk(
  "passwordGenerator/checkIfPwned",
  checkPassword
);

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
    resetPwned: (state: PasswordState) =>
      ({ ...state, pwnedResult: "none" } as PasswordState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIfPwned.pending, (state: PasswordState) => ({
        ...state,
        pwnedResult: "pending",
      }))
      .addCase(
        checkIfPwned.fulfilled,
        (state: PasswordState, action: PayloadAction<boolean>) => ({
          ...state,
          pwnedResult: action.payload ? "bad" : "good",
        })
      )
      .addCase(checkIfPwned.rejected, (state: PasswordState) => ({
        ...state,
        pwnedResult: "error",
      }));
  },
});

export const { changePassword, setTimeoutId, clearTimeoutId, resetPwned } =
  passwordSlice.actions;
export default passwordSlice.reducer;
