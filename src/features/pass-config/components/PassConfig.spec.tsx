import { renderWithProviders } from "../../../utils/test-utils";
import { Settings } from "../../appbar-settings/constants";
import PassConfig from "./PassConfig";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));
jest.mock("./CharFieldSet");

describe("pass configuration", () => {
  describe("when advanced config is false", () => {
    it("should display basic charset config", () => {
      const { getByText } = renderWithProviders(<PassConfig />, {
        preloadedState: {
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.AdvancedConfig]: false },
          },
        },
      });

      expect(getByText("Uppercase (A-Z)")).toBeInTheDocument();
    });

    it("should not display include/exclude", () => {
      const { queryByText } = renderWithProviders(<PassConfig />, {
        preloadedState: {
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.AdvancedConfig]: false },
          },
        },
      });

      expect(queryByText("Include/exclude active")).toBeNull();
    });
  });

  describe("when advanced config is true", () => {
    it("should display advanced charset config", () => {
      const { getByText } = renderWithProviders(<PassConfig />, {
        preloadedState: {
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.AdvancedConfig]: true },
          },
        },
      });

      expect(getByText("A-Z")).toBeInTheDocument();
    });

    it("should display include/exclude", () => {
      const { getByText } = renderWithProviders(<PassConfig />, {
        preloadedState: {
          settings: {
            settingsOpen: false,
            aboutOpen: false,
            toggle: { [Settings.AdvancedConfig]: true },
          },
        },
      });

      expect(getByText("Include/exclude active")).toBeInTheDocument();
    });
  });
});
