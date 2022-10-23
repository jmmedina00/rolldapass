import { renderWithProviders } from "../../../utils/test-utils";
import PassEntropy from "./PassEntropy";
import entropy from "../services/entropy";
import { setupStore } from "../../../app/store";
import { changePassword } from "../passwordSlice";
import { act } from "react-dom/test-utils";
import { changeEntropy } from "../passHealthSlice";
import { Settings } from "../../appbar-settings/constants";
import {
  NotificationType,
  setupNotification,
} from "../../notification/notificationSlice";

describe("pass entropy display", () => {
  const password = "1234qwer";
  const defaultEntropy = "zxcvbn";
  it("should calculate entropy of current password", () => {
    const { getByText } = renderWithProviders(<PassEntropy />, {
      preloadedState: {
        passwordGenerator: {
          password,
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
        passwordHealth: { entropy: defaultEntropy },
      },
    });

    const expected = entropy.algorithms[defaultEntropy].calculator(password);
    expect(getByText(expected.info)).toBeInTheDocument();
    // Would love to test progress bar if I knew how...
  });

  it("should refresh when password changes", () => {
    const store = setupStore({
      passwordGenerator: {
        password,
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      passwordHealth: { entropy: defaultEntropy },
    });

    const { getByText } = renderWithProviders(<PassEntropy />, {
      store,
    });

    const newPassword = "2Agf%HAy^cWgA5zyhbU";
    const expected = entropy.algorithms[defaultEntropy].calculator(newPassword);

    act(() => {
      store.dispatch(changePassword(newPassword));
    });

    expect(getByText(expected.info)).toBeInTheDocument();
  });

  it("should refresh when selected entropy changes", () => {
    const store = setupStore({
      passwordGenerator: {
        password,
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      passwordHealth: { entropy: defaultEntropy },
    });
    const { getByText } = renderWithProviders(<PassEntropy />, {
      store,
    });

    const expected = entropy.algorithms["uic"].calculator(password);

    act(() => {
      store.dispatch(changeEntropy("uic"));
    });

    expect(getByText(expected.info)).toBeInTheDocument();
  });

  it("should process successful pwned result", () => {
    const expectedStore = setupStore({
      passwordGenerator: {
        password,
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      passwordHealth: { entropy: defaultEntropy },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.HaveIBeenPwned]: true },
      },
      notification: {
        type: NotificationType.normal,
        message: "",
        severity: "info",
        open: false,
      },
    });
    expectedStore.dispatch({
      type: "passwordGenerator/checkIfPwned/fulfilled",
      payload: false,
    });
    expectedStore.dispatch(
      setupNotification({
        type: NotificationType.normal,
        message: "Password checked successfully",
        severity: "success",
      })
    );

    const actualStore = setupStore({
      passwordGenerator: {
        password,
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      passwordHealth: { entropy: defaultEntropy },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.HaveIBeenPwned]: true },
      },
      notification: {
        type: NotificationType.normal,
        message: "",
        severity: "info",
        open: false,
      },
    });

    renderWithProviders(<PassEntropy />, { store: actualStore });

    act(() => {
      actualStore.dispatch({
        type: "passwordGenerator/checkIfPwned/fulfilled",
        payload: false,
      });
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });

  it("should process bad pwned result", () => {
    const expectedStore = setupStore({
      passwordGenerator: {
        password,
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      passwordHealth: { entropy: defaultEntropy },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.HaveIBeenPwned]: true },
      },
      notification: {
        type: NotificationType.normal,
        message: "",
        severity: "info",
        open: false,
      },
    });
    expectedStore.dispatch({
      type: "passwordGenerator/checkIfPwned/fulfilled",
      payload: true,
    });
    expectedStore.dispatch(
      setupNotification({
        type: NotificationType.pwned,
        message:
          "Password found (or an error occurred). You may not copy this password",
        severity: "error",
      })
    );

    const actualStore = setupStore({
      passwordGenerator: {
        password,
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      passwordHealth: { entropy: defaultEntropy },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.HaveIBeenPwned]: true },
      },
      notification: {
        type: NotificationType.normal,
        message: "",
        severity: "info",
        open: false,
      },
    });

    renderWithProviders(<PassEntropy />, { store: actualStore });

    act(() => {
      actualStore.dispatch({
        type: "passwordGenerator/checkIfPwned/fulfilled",
        payload: true,
      });
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
