import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { initializeSetting, toggleSetting } from "../settingsSlice";
import SettingToggle from "./SettingToggle";

export const test = 2;

describe("setting toggle", () => {
  it("should reflect the store's state", () => {
    const { getByRole } = renderWithProviders(
      <SettingToggle toggleProperty={"test"} toggleLabel={"Test here"} />,
      {
        preloadedState: {
          settings: { settingsOpen: false, toggle: { test: true } },
        },
      }
    );

    const toggle = getByRole("checkbox") as HTMLInputElement;
    expect(toggle.checked).toBeTruthy();
  });

  it("should reflect the store's state 2", () => {
    const { getByRole } = renderWithProviders(
      <SettingToggle toggleProperty={"test"} toggleLabel={"Test here"} />,
      {
        preloadedState: {
          settings: { settingsOpen: false, toggle: { test: false } },
        },
      }
    );

    const toggle = getByRole("checkbox") as HTMLInputElement;
    expect(toggle.checked).toBeFalsy();
  });

  it("should dispatch toggle action when toggled", () => {
    const expectedStore = setupStore({
      settings: { settingsOpen: true, toggle: { test: true } },
    });
    expectedStore.dispatch(toggleSetting("test"));

    const actualStore = setupStore({
      settings: { settingsOpen: true, toggle: { test: true } },
    });

    const { getByRole } = renderWithProviders(
      <SettingToggle toggleProperty={"test"} toggleLabel={"Test here"} />,
      {
        store: actualStore,
      }
    );

    const toggle = getByRole("checkbox") as HTMLInputElement;

    act(() => {
      fireEvent.click(toggle);
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });

  it("should dispatch initialize action if the setting is missing", () => {
    const expectedStore = setupStore({
      settings: { settingsOpen: true, toggle: { unrelated: false } },
    });
    expectedStore.dispatch(initializeSetting("test"));

    const actualStore = setupStore({
      settings: { settingsOpen: true, toggle: { unrelated: false } },
    });

    renderWithProviders(
      <SettingToggle toggleProperty={"test"} toggleLabel={"Test here"} />,
      {
        store: actualStore,
      }
    ); // Warning is triggered due to undefined status

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
