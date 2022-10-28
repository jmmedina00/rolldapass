import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { initializeSetting, toggleSetting } from "../settingsSlice";
import SettingToggle from "./SettingToggle";

export const test = 2;

describe("setting toggle", () => {
  it.each([true, false])(
    "should reflect the store's state",
    (toggleEnabled) => {
      const { getByRole } = renderWithProviders(
        <SettingToggle toggleProperty={"test"} toggleLabel={"Test here"} />,
        {
          preloadedState: {
            settings: {
              settingsOpen: false,
              aboutOpen: false,
              toggle: { test: toggleEnabled },
            },
          },
        }
      );

      const toggle = getByRole("checkbox") as HTMLInputElement;
      expect(toggle.checked).toEqual(toggleEnabled);
    }
  );

  it("should dispatch toggle action when toggled", () => {
    const expectedStore = setupStore({
      settings: {
        settingsOpen: true,
        aboutOpen: false,
        toggle: { test: true },
      },
    });
    expectedStore.dispatch(toggleSetting("test"));

    const actualStore = setupStore({
      settings: {
        settingsOpen: true,
        aboutOpen: false,
        toggle: { test: true },
      },
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
      settings: {
        settingsOpen: true,
        aboutOpen: false,
        toggle: { unrelated: false },
      },
    });
    expectedStore.dispatch(initializeSetting("test"));

    const actualStore = setupStore({
      settings: {
        settingsOpen: true,
        aboutOpen: false,
        toggle: { unrelated: false },
      },
    });

    renderWithProviders(
      <SettingToggle toggleProperty={"test"} toggleLabel={"Test here"} />,
      {
        store: actualStore,
      }
    );

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
