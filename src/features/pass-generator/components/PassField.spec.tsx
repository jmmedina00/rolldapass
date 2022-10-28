import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { act, fireEvent } from "@testing-library/react";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeLength, toggleCharset } from "../../pass-config/configSlice";
import { changePassword, resetPwned } from "../passwordSlice";
import { generatePassword } from "../services/generate-password";
import passwordReducer from "../passwordSlice";
import configReducer from "../../pass-config/configSlice";
import settingsReducer from "../../appbar-settings/settingsSlice";
import PassField from "./PassField";
import { Settings } from "../../appbar-settings/constants";
import { clearClipboard } from "../thunks/notifiedClipboard";
import { checkPassword } from "../services/haveIBeenPwned";
import { selectNormalizedCharsets } from "../selectNormalizedCharsets";

jest.mock("../thunks/notifiedClipboard");
jest.mock("../services/generate-password");
jest.mock("../services/haveIBeenPwned"); // called by password slice thunk

/* const unrelatedSlice = createSlice({
  name: "unrelated",
  initialState: { counter: 1 },
  reducers: {
    increaseCounter: (state) => {
      state.counter += 1;
    },
  },
}); */

describe("password generator", () => {
  const presetPassword = "abcd";

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    (clearClipboard as jest.Mock).mockReturnValue(() => ({}));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should reflect the password in store", () => {
    const { getByDisplayValue } = renderWithProviders(<PassField />, {
      preloadedState: {
        passwordGenerator: {
          password: presetPassword,
          copiedTimeout: undefined,
          pwnedResult: "none",
        },
      },
    });

    expect(getByDisplayValue(presetPassword)).toBeInTheDocument();
  });

  describe("password changes", () => {
    it("should dispatch an action in store when done manually", () => {
      const newPassword = "1234";
      const expectedStore = setupStore();
      expectedStore.dispatch(changePassword(newPassword));

      const actualStore = setupStore();
      const { getByDisplayValue } = renderWithProviders(<PassField />, {
        store: actualStore,
      });
      const input = getByDisplayValue("");

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
