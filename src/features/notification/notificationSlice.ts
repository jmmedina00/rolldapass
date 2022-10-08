import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum NotificationType {
  normal = "normal",
  clipboard = "clipboard",
  pwned = "pwned",
}

export interface Notification {
  type: NotificationType;
  message: string;
  severity: AlertColor;
}

export interface NotificationState extends Notification {
  open: boolean;
}

const initialState: NotificationState = {
  type: NotificationType.normal,
  message: "",
  severity: "info",
  open: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setupNotification: (
      state: NotificationState,
      action: PayloadAction<Notification>
    ) => ({
      ...state,
      ...action.payload,
      open: true,
    }),
    closeNotification: (state: NotificationState) => ({
      ...state,
      open: false,
    }),
  },
});

export const { setupNotification, closeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
