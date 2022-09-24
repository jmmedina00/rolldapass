import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeLength, ConfigState } from "../configSlice";
import PassConfig from "./PassConfig";

describe("pass config slider", () => {
  const baseConfig: ConfigState = {
    length: 16,
    charsets: [],
  };

  it("should reflect the length of the store", () => {
    const { getByRole } = renderWithProviders(<PassConfig />, {
      preloadedState: { config: baseConfig },
    });

    const range = getByRole("slider") as HTMLInputElement;
    expect(range.value).toEqual("16");
  });

  it("should dispatch a length changed action when value changes", () => {
    const expectedStore = setupStore({ config: baseConfig });
    expectedStore.dispatch(changeLength(32));

    const actualStore = setupStore({ config: baseConfig });
    const { getByRole } = renderWithProviders(<PassConfig />, {
      store: actualStore,
    });

    const range = getByRole("slider") as HTMLInputElement;

    act(() => {
      // Changing value directly in range doesn't work
      fireEvent.change(range, { target: { value: 32 } });
    });

    expect(expectedStore.getState().config.length).toEqual(
      actualStore.getState().config.length
    );
  });
});
