import { setupStore } from "../../../app/store";
import {
  closeNotification,
  NotificationType,
  setupNotification,
} from "../../notification/notificationSlice";
import { clearClipboard, copyPasswordToClipboard } from "./notifiedClipboard";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("notified clipboard thunks", () => {
  jest.spyOn(navigator.clipboard, "writeText");

  it("should close notification when clearing the clipboard", async () => {
    const expectedStore = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: true,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });

    expectedStore.dispatch(closeNotification());

    const actualStore = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: true,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });
    await clearClipboard()(actualStore.dispatch, actualStore.getState, null);

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });

  it("should call the clipboard API when clearing the clipboard", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: true,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });
    await clearClipboard()(store.dispatch, store.getState, null);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("should set up error notification when clearing the clipboard fails", async () => {
    (
      navigator.clipboard.writeText as unknown as jest.SpiedFunction<
        typeof navigator.clipboard.writeText
      >
    ).mockRejectedValue("rejected");

    const expectedStore = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: true,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });

    expectedStore.dispatch(
      setupNotification({
        type: NotificationType.normal,
        severity: "error",
        message: "Failed to clear clipboard",
      })
    );

    const actualStore = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: true,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });
    await clearClipboard()(actualStore.dispatch, actualStore.getState, null);

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });

  it("should setup notification when copying password to clipboard", async () => {
    const expectedStore = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: false,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });

    expectedStore.dispatch(
      setupNotification({
        type: NotificationType.normal,
        severity: "success",
        message: "Password copied to clipboard",
      })
    );

    const actualStore = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: false,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });
    await copyPasswordToClipboard()(
      actualStore.dispatch,
      actualStore.getState,
      null
    );

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });

  it("should call the clipboard API when copying password", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
      notification: {
        open: true,
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
      },
    });
    await copyPasswordToClipboard()(store.dispatch, store.getState, null);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("old");
  });
});
