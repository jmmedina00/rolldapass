import notificationReducer, {
  closeNotification,
  Notification,
  NotificationType,
  setupNotification,
} from "./notificationSlice";

describe("notification reducer", () => {
  const notification: Notification = {
    type: NotificationType.clipboard,
    message: "Clipboard",
    severity: "success",
  };

  it("should handle initial state", () => {
    expect(notificationReducer(undefined, { type: "???" })).toEqual({
      type: NotificationType.normal,
      message: "",
      severity: "info",
      open: false,
    });
  });

  it("should update what notification to show", () => {
    const { open, ...state } = notificationReducer(
      undefined,
      setupNotification(notification)
    );

    expect(state).toEqual(notification);
  });

  it("should set open to true when updating notification", () => {
    expect(
      notificationReducer(undefined, setupNotification(notification)).open
    ).toBeTruthy();
  });

  it("should close the notification", () => {
    expect(
      notificationReducer({ ...notification, open: true }, closeNotification())
        .open
    ).toBeFalsy();
  });
});
