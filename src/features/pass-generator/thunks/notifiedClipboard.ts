import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import {
  closeNotification,
  NotificationType,
  setupNotification,
} from "../../notification/notificationSlice";

export const clearClipboard =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
      await window.navigator.clipboard.writeText("");
      dispatch(closeNotification());
    } catch (e) {
      dispatch(
        setupNotification({
          type: NotificationType.normal,
          severity: "error",
          message: "Failed to clear clipboard",
        })
      );
    }
  };

export const copyPasswordToClipboard =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const password = getState().passwordGenerator.password;
    await window.navigator.clipboard.writeText(password);
    dispatch(
      setupNotification({
        type: NotificationType.normal,
        severity: "success",
        message: "Password copied to clipboard",
      })
    );
  };
