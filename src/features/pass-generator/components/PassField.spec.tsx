import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { act, fireEvent } from "@testing-library/react";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeLength } from "../../pass-config/configSlice";
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

const unrelatedSlice = createSlice({
  name: "unrelated",
  initialState: { counter: 1 },
  reducers: {
    increaseCounter: (state) => {
      state.counter += 1;
    },
  },
});

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

  it("should dispatch an action in store when password changes manually", () => {
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

  it("should get a new password when config state changes", () => {
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

  it("should change the password in state when config state changes", () => {
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

  it("should call clear clipboard thunk when the password changes", () => {
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

    expect(clearClipboard).toHaveBeenCalled();
  });

  it("should keep the current password in state when something unrelated in state changes", () => {
    const store = configureStore({
      reducer: combineReducers({
        passwordGenerator: passwordReducer,
        unrelated: unrelatedSlice.reducer,
        config: configReducer,
        settings: settingsReducer,
      }),
    });

    renderWithProviders(<PassField />, { store });
    act(() => {
      store.dispatch(changePassword("thisisGood"));
      store.dispatch(unrelatedSlice.actions.increaseCounter());
    });

    expect(store.getState().passwordGenerator.password).toEqual("thisisGood");
  });

  it("should send password to HIBP after timer", () => {
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

    jest.runAllTimers();

    expect((checkPassword as jest.Mock).mock.lastCall[0]).toEqual("qwerty");
  });

  it("should reset pwned status when password changes", () => {
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
