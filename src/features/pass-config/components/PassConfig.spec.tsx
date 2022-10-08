import { renderWithProviders } from "../../../utils/test-utils";
import { Settings } from "../../appbar-settings/constants";
import PassConfig from "./PassConfig";

jest.mock("./CharFieldSet");

describe("pass configuration", () => {
  it("should display basic charset config", () => {
    const { getByText } = renderWithProviders(<PassConfig />, {
      preloadedState: {
        settings: {
          settingsOpen: false,
          toggle: { [Settings.AdvancedConfig]: false },
        },
      },
    });

    expect(getByText("Uppercase (A-Z)")).toBeInTheDocument();
  });

  it("should display advanced charset config", () => {
    const { getByText } = renderWithProviders(<PassConfig />, {
      preloadedState: {
        settings: {
          settingsOpen: false,
          toggle: { [Settings.AdvancedConfig]: true },
        },
      },
    });

    expect(getByText("A-Z")).toBeInTheDocument();
  });

  it("should display include/exclude when advanced config is active", () => {
    const { getByText } = renderWithProviders(<PassConfig />, {
      preloadedState: {
        settings: {
          settingsOpen: false,
          toggle: { [Settings.AdvancedConfig]: true },
        },
      },
    });

    expect(getByText("Include/exclude active")).toBeInTheDocument();
  });

  it("should not display include/exclude when advanced config is inactive", () => {
    const { queryByText } = renderWithProviders(<PassConfig />, {
      preloadedState: {
        settings: {
          settingsOpen: false,
          toggle: { [Settings.AdvancedConfig]: false },
        },
      },
    });

    expect(queryByText("Include/exclude active")).toBeNull();
  });
});
