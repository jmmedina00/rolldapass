import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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

export const clearClipboard =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    await window.navigator.clipboard.writeText("");
    dispatch(clearTimeoutId());
  };

export const copyPasswordToClipboard =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { password, copiedTimeout } = getState().passwordGenerator;

    if (copiedTimeout) {
      dispatch(clearTimeoutId());
    }

    await window.navigator.clipboard.writeText(password);

    const newTimeout = setTimeout(() => {
      dispatch(clearClipboard());
    }, 10000);

    dispatch(setTimeoutId(newTimeout as unknown as number));
  };

export const { changePassword, setTimeoutId, clearTimeoutId } =
  passwordSlice.actions;
export default passwordSlice.reducer;
