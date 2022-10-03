import { renderWithProviders } from "../../../utils/test-utils";
import PassEntropy from "./PassEntropy";
import entropy from "../services/entropy";
import { setupStore } from "../../../app/store";
import { changePassword } from "../passwordSlice";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";
import { changeEntropy } from "../passHealthSlice";

describe("pass entropy", () => {
  const password = "1234qwer";
  const defaultEntropy = "zxcvbn";
  it("should calculate entropy of current password", () => {
    const { getByText } = renderWithProviders(<PassEntropy />, {
      preloadedState: {
        passwordGenerator: { password },
        passwordHealth: { entropy: defaultEntropy },
      },
    });

    const expected = entropy.algorithms[defaultEntropy].calculator(password);
    expect(getByText(expected.info)).toBeInTheDocument();
    // Would love to test progress bar if I knew how...
  });

  it("should refresh when password changes", () => {
    const store = setupStore({
      passwordGenerator: { password },
      passwordHealth: { entropy: defaultEntropy },
    });

    const { getByText } = renderWithProviders(<PassEntropy />, {
      store,
    });

    const newPassword = "2Agf%HAy^cWgA5zyhbU";
    const expected = entropy.algorithms[defaultEntropy].calculator(newPassword);

    act(() => {
      store.dispatch(changePassword(newPassword));
    });

    expect(getByText(expected.info)).toBeInTheDocument();
  });

  it("should change selected entropy in store", () => {
    const expectedStore = setupStore({
      passwordHealth: { entropy: defaultEntropy },
    });
    expectedStore.dispatch(changeEntropy("uic"));

    const actualStore = setupStore({
      passwordHealth: { entropy: defaultEntropy },
    });

    const { getByDisplayValue } = renderWithProviders(<PassEntropy />, {
      store: actualStore,
    });
    const selector = getByDisplayValue(defaultEntropy) as HTMLInputElement;

    act(() => {
      fireEvent.change(selector, { target: { value: "uic" } });
    });

    expect(expectedStore.getState().passwordHealth.entropy).toEqual(
      actualStore.getState().passwordHealth.entropy
    );
  });

  it("should refresh when selected entropy changes", () => {
    const store = setupStore({ passwordHealth: { entropy: defaultEntropy } });
    const { getByText } = renderWithProviders(<PassEntropy />, {
      store,
    });

    const expected = entropy.algorithms["uic"].calculator(password);

    act(() => {
      store.dispatch(changeEntropy("uic"));
    });

    expect(getByText(expected.info)).toBeInTheDocument();
  });
});
