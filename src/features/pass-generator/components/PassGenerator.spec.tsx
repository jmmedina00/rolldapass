import { act, fireEvent } from "@testing-library/react";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changePassword } from "../passwordSlice";
import PassGenerator from "./PassGenerator";

describe("password generator", () => {
  const presetPassword = "abcd";
  const inputLabel = "Generate your password";

  it("should reflect the password in store", () => {
    const { getByDisplayValue } = renderWithProviders(<PassGenerator />, {
      preloadedState: { passwordGenerator: { password: presetPassword } },
    });

    expect(getByDisplayValue(presetPassword)).toBeInTheDocument();
  });

  it("should dispatch an action in store when password changes manually", () => {
    const newPassword = "1234";
    const expectedStore = setupStore();
    expectedStore.dispatch(changePassword(newPassword));

    const actualStore = setupStore();
    const { getByDisplayValue } = renderWithProviders(<PassGenerator />, {
      store: actualStore,
    });
    const input = getByDisplayValue("");

    act(() => {
      fireEvent.change(input, { target: { value: newPassword } });
    });

    expect(expectedStore.getState()).toEqual(actualStore.getState());
  });
});
