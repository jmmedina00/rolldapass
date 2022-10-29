import { fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeEntropy } from "../passHealthSlice";
import EntropySelect from "./EntropySelector";

describe("pass entropy select", () => {
  const defaultEntropy = "zxcvbn";

  it("should reflect the entropy of the store", async () => {
    const { getByDisplayValue } = renderWithProviders(<EntropySelect />, {
      preloadedState: { passwordHealth: { entropy: defaultEntropy } },
    });
    const selector = await waitFor(
      () => getByDisplayValue(defaultEntropy) as HTMLInputElement
    );
    expect(selector).toBeInTheDocument();
  });

  it("should change selected entropy in store", async () => {
    const expectedStore = setupStore({
      passwordHealth: { entropy: defaultEntropy },
    });
    expectedStore.dispatch(changeEntropy("uic"));

    const actualStore = setupStore({
      passwordHealth: { entropy: defaultEntropy },
    });

    const { getByDisplayValue } = renderWithProviders(<EntropySelect />, {
      store: actualStore,
    });
    const selector = await waitFor(
      () => getByDisplayValue(defaultEntropy) as HTMLInputElement
    );

    act(() => {
      fireEvent.change(selector, { target: { value: "uic" } });
    });

    expect(expectedStore.getState().passwordHealth.entropy).toEqual(
      actualStore.getState().passwordHealth.entropy
    );
  });
});
