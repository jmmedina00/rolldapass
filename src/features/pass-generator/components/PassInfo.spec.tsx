import { renderWithProviders } from "../../../utils/test-utils";
import PassInfo from "./PassInfo";
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
import { waitFor } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string, obj: { result: number }) =>
        str + " " + obj.result.toString(),
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

console.error = jest.fn(); // whole suite is buzzing noise due to lazy loading

describe("pass complementary display", () => {
  const password = "1234qwer";
  const defaultEntropy = "zxcvbn";

  describe("entropy handling", () => {
    it("should take parameters from store", async () => {
      const { getByText } = renderWithProviders(<PassInfo />, {
        preloadedState: {
          passwordGenerator: {
            password,
            copiedTimeout: undefined,
            pwnedResult: "none",
          },
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.Entropy]: true },
          },
          passwordHealth: { entropy: defaultEntropy },
        },
      });

      const expected = entropy.algorithms[defaultEntropy].calculator(password);
      await waitFor(() =>
        expect(
          getByText("entropyResults.zxcvbn " + expected.numericResult)
        ).toBeInTheDocument()
      );
      // Would love to test progress bar if I knew how...
    });

    it("should refresh when password changes", async () => {
      const store = setupStore({
        passwordGenerator: {
          password,
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.Entropy]: true },
        },
        passwordHealth: { entropy: defaultEntropy },
      });

      const { getByText } = renderWithProviders(<PassInfo />, {
        store,
      });

      const newPassword = "2Agf%HAy^cWgA5zyhbU";
      const expected =
        entropy.algorithms[defaultEntropy].calculator(newPassword);

      act(() => {
        store.dispatch(changePassword(newPassword));
      });

      await waitFor(() =>
        expect(
          getByText("entropyResults.zxcvbn " + expected.numericResult)
        ).toBeInTheDocument()
      );
    });

    it("should refresh when selected entropy changes", async () => {
      const store = setupStore({
        passwordGenerator: {
          password,
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.Entropy]: true },
        },
        passwordHealth: { entropy: defaultEntropy },
      });
      const { getByText } = renderWithProviders(<PassInfo />, {
        store,
      });

      const expected = entropy.algorithms["uic"].calculator(password);

      act(() => {
        store.dispatch(changeEntropy("uic"));
      });

      await waitFor(() =>
        expect(
          getByText("entropyResults.uic " + expected.numericResult)
        ).toBeInTheDocument()
      );
    });
  });

  describe("pwned handling", () => {
    it("should process successful result", () => {
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
          message: "pwned.good",
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

      renderWithProviders(<PassInfo />, { store: actualStore });

      act(() => {
        actualStore.dispatch({
          type: "passwordGenerator/checkIfPwned/fulfilled",
          payload: false,
        });
      });

      expect(expectedStore.getState()).toEqual(actualStore.getState());
    });

    it("should process bad result", () => {
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
          message: "pwned.bad",
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

      renderWithProviders(<PassInfo />, { store: actualStore });

      act(() => {
        actualStore.dispatch({
          type: "passwordGenerator/checkIfPwned/fulfilled",
          payload: true,
        });
      });

      expect(expectedStore.getState()).toEqual(actualStore.getState());
    });
  });
});
