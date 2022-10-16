import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { clearTimeoutId, setTimeoutId } from "../passwordSlice";

// Abandoned - clipboard actions on a timer don't work reliably

export const clearClipboard =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    clearTimeout(getState().passwordGenerator.copiedTimeout);
    dispatch(clearTimeoutId());
    await window.navigator.clipboard.writeText("");
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
