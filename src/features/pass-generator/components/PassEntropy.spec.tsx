import { renderWithProviders } from "../../../utils/test-utils";
import PassEntropy from "./PassEntropy";
import entropy from "../services/entropy";
import { setupStore } from "../../../app/store";
import { changePassword } from "../passwordSlice";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

describe("pass entropy", () => {
  const password = "1234qwer";
  it("should calculate entropy of current password", () => {
    const { getByText } = renderWithProviders(<PassEntropy />, {
      preloadedState: { passwordGenerator: { password } },
    });

    const expected = entropy.algorithms["zxcvbn"].calculator(password);
    expect(getByText(expected.info)).toBeInTheDocument();
    // Would love to test progress bar if I knew how...
  });

  it("should refresh when password changes", () => {
    const store = setupStore({ passwordGenerator: { password } });

    const { getByText } = renderWithProviders(<PassEntropy />, {
      store,
    });

    const newPassword = "2Agf%HAy^cWgA5zyhbU";
    const expected = entropy.algorithms["zxcvbn"].calculator(newPassword);

    act(() => {
      store.dispatch(changePassword(newPassword));
    });

    expect(getByText(expected.info)).toBeInTheDocument();
  });

  it("should refresh when selected entropy changes", () => {
    const { getByText, getByDisplayValue } = renderWithProviders(
      <PassEntropy />,
      {
        preloadedState: { passwordGenerator: { password } },
      }
    );

    const expected = entropy.algorithms["uic"].calculator(password);
    const selector = getByDisplayValue("zxcvbn") as HTMLInputElement;

    act(() => {
      fireEvent.change(selector, { target: { value: "uic" } });
    });

    expect(getByText(expected.info)).toBeInTheDocument();
  });
});
