import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { closeNotification, NotificationType } from "../notificationSlice";
import ClipboardClearButton from "./ClipboardClearButton";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("clipboard clear button", () => {
  jest.spyOn(navigator.clipboard, "writeText");

  it("should call clipboard API when clicked", async () => {
    const { getByRole } = renderWithProviders(<ClipboardClearButton />);
    const button = getByRole("button");

    act(() => {
      button.click();
    });
    await new Promise(process.nextTick); // Ensure event handler has fully run before asserting
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("should close the notification in store", async () => {
    const expectedStore = setupStore({
      notification: {
        type: NotificationType.normal,
        message: "Test",
        severity: "info",
        open: true,
      },
    });
    expectedStore.dispatch(closeNotification());

    const actualStore = setupStore({
      notification: {
        type: NotificationType.normal,
        message: "Test",
        severity: "info",
        open: true,
      },
    });

    const { getByRole } = renderWithProviders(<ClipboardClearButton />, {
      store: actualStore,
    });
    const button = getByRole("button");

    act(() => {
      button.click();
    });
    await new Promise(process.nextTick); // Ensure event handler has fully run before asserting
    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
