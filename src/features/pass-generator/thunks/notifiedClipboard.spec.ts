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

  describe("when copying to clipboard", () => {
    it("should call the clipboard API", async () => {
      const store = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
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

    it("should setup notification", async () => {
      const expectedStore = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
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
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
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
  });

  describe("when clearing clipboard", () => {
    it("should call the clipboard API", async () => {
      const store = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
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

    it("should close notification", async () => {
      const expectedStore = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
        notification: {
          open: true,
          message: "Test",
          severity: "info",
          type: NotificationType.normal,
        },
      });

      expectedStore.dispatch(closeNotification());

      const actualStore = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
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

    it("should set up error notification upon failure", async () => {
      (
        navigator.clipboard.writeText as unknown as jest.SpiedFunction<
          typeof navigator.clipboard.writeText
        >
      ).mockRejectedValue("rejected");

      const expectedStore = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
        notification: {
          open: true,
          message: "Test",
          severity: "info",
          type: NotificationType.normal,
        },
      });

      expectedStore.dispatch(
        setupNotification({
          type: NotificationType.clipboard,
          severity: "error",
          message: "Failed to clear clipboard",
        })
      );

      const actualStore = setupStore({
        passwordGenerator: {
          password: "old",
          copiedTimeout: 12,
          pwnedResult: "none",
        },
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
  });
});
