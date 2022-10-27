import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { closeNotification, NotificationType } from "../notificationSlice";
import ClipboardClearButton from "./ClipboardClearButton";
import NotificationDisplay from "./NotificationDisplay";

jest.mock("./ClipboardClearButton");

describe("notification display", () => {
  beforeEach(() => {
    (ClipboardClearButton as jest.Mock).mockReturnValue(
      <button aria-label="Clipboard" title="Clipboard" />
    );
  });

  it("should display normal close button when displaying normal notification", () => {
    const { getByRole } = renderWithProviders(<NotificationDisplay />, {
      preloadedState: {
        notification: {
          message: "Test",
          severity: "info",
          type: NotificationType.normal,
          open: true,
        },
      },
    });

    const button = getByRole("button");
    expect(button.title).toEqual("Close"); // As per MUI's specs
  });

  it("should display clipboard button when displaying normal notification", () => {
    const { getByRole } = renderWithProviders(<NotificationDisplay />, {
      preloadedState: {
        notification: {
          message: "Test",
          severity: "info",
          type: NotificationType.clipboard,
          open: true,
        },
      },
    });

    const button = getByRole("button");
    expect(button.title).toEqual("Clipboard");
  });

  it("should display no button when displaying pwned notification", () => {
    const { queryByRole } = renderWithProviders(<NotificationDisplay />, {
      preloadedState: {
        notification: {
          message: "Test",
          severity: "info",
          type: NotificationType.pwned,
          open: true,
        },
      },
    });

    expect(queryByRole("button")).toBeFalsy();
  });

  it("should close notification in state when normal button is clicked", () => {
    const expectedStore = setupStore({
      notification: {
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
        open: true,
      },
    });
    expectedStore.dispatch(closeNotification());

    const actualStore = setupStore({
      notification: {
        message: "Test",
        severity: "info",
        type: NotificationType.normal,
        open: true,
      },
    });

    const { getByRole } = renderWithProviders(<NotificationDisplay />, {
      store: actualStore,
    });
    const button = getByRole("button");

    act(() => {
      button.click();
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
