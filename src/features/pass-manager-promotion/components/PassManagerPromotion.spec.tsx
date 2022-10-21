import { renderWithProviders } from "../../../utils/test-utils";
import { Settings } from "../../appbar-settings/constants";
import { passManagers } from "../constants";
import PassManagerPromotion from "./PassManagerPromotion";

describe("pass manager promotion", () => {
  const exampleTitles = Object.entries(passManagers).map(
    ([_, { label }]) => label
  );

  const examplePassManagersTitles = Object.entries(passManagers).map(
    ([_, { items }]) => items[0].name
  );

  it("should display all password managers together when setting is disabled", () => {
    const { queryByText } = renderWithProviders(<PassManagerPromotion />, {
      preloadedState: {
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.PassManagerOrganized]: false },
        },
      },
    });

    for (const title of exampleTitles) {
      expect(queryByText(title)).not.toBeInTheDocument();
    }

    for (const title of examplePassManagersTitles) {
      expect(queryByText(title)).toBeInTheDocument();
    }
  });

  it("should display password managers in sections when setting is enabled", () => {
    const { queryByText } = renderWithProviders(<PassManagerPromotion />, {
      preloadedState: {
        settings: {
          settingsOpen: false,
          aboutOpen: false,
          toggle: { [Settings.PassManagerOrganized]: true },
        },
      },
    });

    for (const title of exampleTitles) {
      expect(queryByText(title)).toBeInTheDocument();
    }

    for (const title of examplePassManagersTitles) {
      expect(queryByText(title)).toBeInTheDocument();
    }
  });
});
