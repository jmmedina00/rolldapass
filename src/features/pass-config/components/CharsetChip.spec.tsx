import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { ConfigState, toggleCharset } from "../configSlice";
import CharsetDefinition from "../constants";
import CharsetChip from "./CharsetChip";

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
    const renderedChip = getByText(chipInfo.label);

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

      const chip = getByText(chipInfo.label).parentElement as HTMLElement;

      expect(Array.from(chip.classList)).toContain(interestingClass);
    }
  );
});
