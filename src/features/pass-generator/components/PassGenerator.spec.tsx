import { renderWithProviders } from "../../../utils/test-utils";
import { Settings } from "../../appbar-settings/constants";
import EntropySelect from "./EntropySelector";
import PassGenerator from "./PassGenerator";

jest.mock("./PassField");
jest.mock("./PassEntropy");
jest.mock("./EntropySelector");

describe("pass generator", () => {
  beforeEach(() => {
    (EntropySelect as jest.Mock).mockReturnValue(<div>Entropy selector</div>);
  });

  it("should display entropy selector if enabled in settings", () => {
    const { getByText } = renderWithProviders(<PassGenerator />, {
      preloadedState: {
        settings: {
          aboutOpen: false,
          settingsOpen: false,
          toggle: { [Settings.Entropy]: true },
        },
      },
    });

    expect(getByText("Entropy selector")).toBeInTheDocument();
  });

  it("should hide entropy selector if disabled in settings", () => {
    const { queryByText } = renderWithProviders(<PassGenerator />, {
      preloadedState: {
        settings: {
          aboutOpen: false,
          settingsOpen: false,
          toggle: { [Settings.Entropy]: false },
        },
      },
    });

    expect(queryByText("Entropy selector")).toBeFalsy();
  });
});
