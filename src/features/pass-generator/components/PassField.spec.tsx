import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { act, fireEvent } from "@testing-library/react";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeLength, ConfigState } from "../../pass-config/configSlice";
import { changePassword } from "../passwordSlice";
import { generatePassword } from "../services/generate-password";
import passwordReducer from "../passwordSlice";
import configReducer from "../../pass-config/configSlice";
import settingsReducer from "../../appbar-settings/settingsSlice";
import PassField from "./PassField";
import { Settings } from "../../appbar-settings/constants";
import { clearClipboard } from "../thunks/notifiedClipboard";

jest.mock("../thunks/notifiedClipboard");
jest.mock("../services/generate-password");

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
  const inputLabel = "Generate your password";

  beforeEach(() => {
    (clearClipboard as jest.Mock).mockReturnValue(() => ({}));
  });

  it("should reflect the password in store", () => {
    const { getByDisplayValue } = renderWithProviders(<PassField />, {
      preloadedState: {
        passwordGenerator: {
          password: presetPassword,
          copiedTimeout: undefined,
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

  it("should get a new password when config state changes (basic)", () => {
    const store = setupStore({
      config: {
        length: 3,
        charsets: { basic: ["ABCD"], advanced: ["1234"] },
        additionalChars: { include: "&", exclude: "B" },
      },
      settings: {
        settingsOpen: false,
        toggle: { [Settings.AdvancedConfig]: false },
      },
    });

    renderWithProviders(<PassField />, { store });

    act(() => {
      store.dispatch(changeLength(4));
    });

    expect(generatePassword).toHaveBeenLastCalledWith(4, ["ABCD"]);
  });

  it.each([
    [
      {
        charsets: { basic: ["ABCD"], advanced: ["1234"] },
        additionalChars: { include: "&2", exclude: "B" },
      },
      ["ACD", "1234", "&"],
    ],
    [
      {
        charsets: { basic: ["ABCD"], advanced: ["1234"] },
        additionalChars: { include: "", exclude: "" },
      },
      ["ABCD", "1234"],
    ],
  ])(
    "should get a new password when config state changes (advanced)",
    (charsetInfo: Omit<ConfigState, "length">, expectedCharsets: string[]) => {
      const store = setupStore({
        config: {
          ...charsetInfo,
          length: 3,
        },
        settings: {
          settingsOpen: false,
          toggle: { [Settings.AdvancedConfig]: true },
        },
      });

      renderWithProviders(<PassField />, { store });

      act(() => {
        store.dispatch(changeLength(4));
      });

      expect(generatePassword).toHaveBeenLastCalledWith(4, expectedCharsets);
    }
  );

  it("should change the password in state when config state changes", () => {
    const store = setupStore({
      config: {
        length: 3,
        charsets: { basic: ["ABCD"], advanced: [] },
        additionalChars: { include: "", exclude: "" },
      },
      passwordGenerator: { password: "old", copiedTimeout: undefined },
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
      passwordGenerator: { password: "old", copiedTimeout: undefined },
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
});
