import { act, fireEvent } from "@testing-library/react";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeLength, toggleCharset } from "../../pass-config/configSlice";
import { changePassword, resetPwned } from "../passwordSlice";
import { generatePassword } from "../services/generate-password";
import PassField from "./PassField";
import { Settings } from "../../appbar-settings/constants";
import {
  clearClipboard,
  copyPasswordToClipboard,
} from "../thunks/notifiedClipboard";
import { checkPassword } from "../services/haveIBeenPwned";
import { selectNormalizedCharsets } from "../selectNormalizedCharsets";

jest.mock("../thunks/notifiedClipboard");
jest.mock("../services/generate-password");
jest.mock("../services/haveIBeenPwned"); // called by password slice thunk

describe("password generator", () => {
  const presetPassword = "abcd";
  const passLabel = "Generate your password";

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    (clearClipboard as jest.Mock).mockReturnValue(() => ({}));
    (copyPasswordToClipboard as jest.Mock).mockReturnValue(() => ({}));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should reflect the password in store", () => {
    const { getByLabelText } = renderWithProviders(<PassField />, {
      preloadedState: {
        passwordGenerator: {
          password: presetPassword,
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
      },
    });

    expect((getByLabelText(passLabel) as HTMLInputElement).value).toEqual(
      presetPassword
    );
  });

  describe("password changes", () => {
    it("should dispatch an action in store when done manually", () => {
      const newPassword = "1234";
      const expectedStore = setupStore();
      expectedStore.dispatch(changePassword(newPassword));

      const actualStore = setupStore();
      const { getByLabelText } = renderWithProviders(<PassField />, {
        store: actualStore,
      });
      const input = getByLabelText(passLabel);

      act(() => {
        fireEvent.change(input, { target: { value: newPassword } });
      });
      expect(expectedStore.getState()).toEqual(actualStore.getState());
    });

    it("should call for clipboard to be cleared", () => {
      const store = setupStore({
        config: {
          length: 3,
          charsets: { basic: ["ABCD"], advanced: [] },
          additionalChars: { include: "", exclude: "" },
        },
        passwordGenerator: {
          password: "old",
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
      });

      renderWithProviders(<PassField />, { store });
      act(() => {
        store.dispatch(changePassword("new"));
      });

      expect(clearClipboard).toHaveBeenCalled();
    });

    it("should reset pwned status", () => {
      const expectedStore = setupStore({
        passwordGenerator: {
          password: "abcd",
          copiedTimeout: undefined,
          pwnedResult: "good",
        },
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.HaveIBeenPwned]: true },
        },
      });
      expectedStore.dispatch(resetPwned());

      const actualStore = setupStore({
        passwordGenerator: {
          password: "abcd",
          copiedTimeout: undefined,
          pwnedResult: "good",
        },
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.HaveIBeenPwned]: true },
        },
      });

      renderWithProviders(<PassField />, { store: actualStore });

      act(() => {
        actualStore.dispatch(changePassword("qwerty"));
      });

      expect(expectedStore.getState().passwordGenerator.pwnedResult).toEqual(
        actualStore.getState().passwordGenerator.pwnedResult
      );
    });
  });

  describe("config changes", () => {
    it("should trigger getting a password from service", () => {
      const store = setupStore({
        config: {
          length: 3,
          charsets: { basic: ["ABCD"], advanced: ["1234"] },
          additionalChars: { include: "&", exclude: "B" },
        },
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.AdvancedConfig]: false },
        },
      });

      renderWithProviders(<PassField />, { store });

      act(() => {
        store.dispatch(changeLength(4));
      });

      const expectedCharsets = selectNormalizedCharsets(store.getState());

      expect(generatePassword).toHaveBeenLastCalledWith(4, expectedCharsets);
    });

    it("should not call service with empty charset list", () => {
      const store = setupStore({
        config: {
          length: 3,
          charsets: { basic: ["ABCD"], advanced: ["1234"] },
          additionalChars: { include: "&", exclude: "B" },
        },
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.AdvancedConfig]: false },
        },
      });

      renderWithProviders(<PassField />, { store });

      act(() => {
        store.dispatch(toggleCharset({ category: "basic", charset: "ABCD" }));
      });

      expect(generatePassword).not.toHaveBeenCalledWith(3, []);
    });

    it("should dispatch change password action", () => {
      (generatePassword as jest.Mock).mockReturnValue("test");

      const store = setupStore({
        config: {
          length: 3,
          charsets: { basic: ["ABCD"], advanced: [] },
          additionalChars: { include: "", exclude: "" },
        },
        passwordGenerator: {
          password: "old",
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
      });

      renderWithProviders(<PassField />, { store });
      act(() => {
        store.dispatch(changeLength(4));
      });

      expect(store.getState().passwordGenerator.password).not.toEqual("old");
    });
  });

  describe("buttons", () => {
    it("visibility should toggle pass input type", () => {
      const visibilityButtonIcon = "visibility";

      const { getByText, getByLabelText } = renderWithProviders(<PassField />, {
        preloadedState: {
          passwordGenerator: {
            password: presetPassword,
            copiedTimeout: undefined,
            pwnedResult: "none",
          },
        },
      });

      const input = getByLabelText(passLabel) as HTMLInputElement;
      const button = getByText(visibilityButtonIcon);

      expect(input.type).toEqual("password");

      act(() => {
        button.click();
      });

      expect(input.type).toEqual("text");

      act(() => {
        button.click();
      });

      expect(input.type).toEqual("password");
    });

    describe("regenerate", () => {
      const regenerateButtonIcon = "cached";

      it("should trigger changing the password with current params", () => {
        const store = setupStore({
          config: {
            length: 3,
            charsets: { basic: ["ABCD"], advanced: ["1234"] },
            additionalChars: { include: "&", exclude: "B" },
          },
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.AdvancedConfig]: false },
          },
        });
        const expectedCharsets = selectNormalizedCharsets(store.getState());

        const { getByText } = renderWithProviders(<PassField />, { store });
        const button = getByText(regenerateButtonIcon);

        act(() => {
          button.click();
        });

        expect(generatePassword).toHaveBeenLastCalledWith(3, expectedCharsets);
      });

      it("should be disabled when there are no charsets", () => {
        const store = setupStore({
          config: {
            length: 3,
            charsets: { basic: [], advanced: ["1234"] },
            additionalChars: { include: "&", exclude: "B" },
          },
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.AdvancedConfig]: false },
          },
        });

        const { getByText } = renderWithProviders(<PassField />, { store });
        const button = getByText(regenerateButtonIcon)
          .parentElement as HTMLButtonElement;

        expect(Array.from(button.classList.values())).toContain("Mui-disabled");
      });
    });

    describe("clipboard", () => {
      const clipboardButtonIcon = "content_paste";

      it("should trigger copying password to clipboard", () => {
        const { getByText } = renderWithProviders(<PassField />, {
          preloadedState: {
            passwordGenerator: {
              password: presetPassword,
              copiedTimeout: undefined,
              pwnedResult: "none",
            },
          },
        });

        const button = getByText(clipboardButtonIcon);

        act(() => {
          button.click();
        });

        expect(copyPasswordToClipboard).toHaveBeenCalled();
      });

      it("should be disabled if pwned is active with no good result", () => {
        const { getByText } = renderWithProviders(<PassField />, {
          preloadedState: {
            passwordGenerator: {
              password: "abcd",
              copiedTimeout: undefined,
              pwnedResult: "none",
            },
            settings: {
              settingsOpen: false,
              aboutOpen: false,
              toggle: { [Settings.HaveIBeenPwned]: true },
            },
          },
        });

        const button = getByText(clipboardButtonIcon)
          .parentElement as HTMLButtonElement;

        expect(Array.from(button.classList.values())).toContain("Mui-disabled");
      });
    });
  });

  it("should send password to HIBP after timer", async () => {
    console.error = jest.fn(); // Silence inevitable warning in this test
    const store = setupStore({
      passwordGenerator: {
        password: "abcd",
        copiedTimeout: undefined,
        pwnedResult: "none",
      },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.HaveIBeenPwned]: true },
      },
    });

    renderWithProviders(<PassField />, { store });

    act(() => {
      store.dispatch(changePassword("qwerty"));
    });

    jest.runAllTimers(); // testing-library doesn't like being updated by fake timers

    expect((checkPassword as jest.Mock).mock.lastCall[0]).toEqual("qwerty");
  });
});
