import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { ConfigState, toggleCharset } from "../configSlice";
import CharsetChip from "./CharsetChip";

describe("charset chip component", () => {
  const baseConfig: ConfigState = {
    length: 2,
    charsets: [],
  };

  it("should dispatch a toggle charset action when clicked", () => {
    const charset = "abc";
    const label = "Chip test";
    const chip = <CharsetChip charsetDef={{ label, charset }} />;

    const expectedStore = setupStore({ config: baseConfig });
    expectedStore.dispatch(toggleCharset(charset));

    const actualStore = setupStore({ config: baseConfig });
    const { getByText } = renderWithProviders(chip, { store: actualStore });
    const renderedChip = getByText(label);

    act(() => {
      renderedChip.click();
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
