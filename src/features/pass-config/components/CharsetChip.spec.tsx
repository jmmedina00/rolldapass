import { act } from "react-dom/test-utils";
import { useTranslation } from "react-i18next";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { ConfigState, toggleCharset } from "../configSlice";
import CharsetDefinition from "../constants";
import CharsetChip from "./CharsetChip";

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

describe("charset chip component", () => {
  const baseConfig: ConfigState = {
    length: 2,
    charsets: { basic: [], advanced: [] },
    additionalChars: { include: "", exclude: "" },
  };

  const chipInfo: CharsetDefinition = {
    charset: "abc",
    label: "Chip test",
    category: "basic",
  };

  it("should dispatch a toggle charset action when clicked", () => {
    const expectedStore = setupStore({ config: baseConfig });
    expectedStore.dispatch(toggleCharset({ ...chipInfo }));

    const actualStore = setupStore({ config: baseConfig });
    const { getByText } = renderWithProviders(<CharsetChip {...chipInfo} />, {
      store: actualStore,
    });
    const renderedChip = getByText(chipInfo.label as string);

    act(() => {
      renderedChip.click();
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });

  it.each([
    [true, "MuiChip-colorPrimary"],
    [false, "MuiChip-colorDefault"],
  ])(
    "should reflect selected charset state in store",
    (present, interestingClass) => {
      const { getByText } = renderWithProviders(<CharsetChip {...chipInfo} />, {
        preloadedState: {
          config: {
            length: 2,
            charsets: {
              basic: present ? [chipInfo.charset] : [],
              advanced: [],
            },
            additionalChars: { include: "", exclude: "" },
          },
        },
      });

      const chip = getByText(chipInfo.label as string)
        .parentElement as HTMLElement;

      expect(Array.from(chip.classList)).toContain(interestingClass);
    }
  );

  it("should translate a chip when needed", () => {
    const chipInfo: CharsetDefinition = {
      charset: "abc",
      label: {
        key: "charsets.test",
        clarification: "12",
      },
      category: "basic",
    };

    const { getByText } = renderWithProviders(<CharsetChip {...chipInfo} />);

    expect(getByText("charsets.test")).toBeInTheDocument();
  });
});
