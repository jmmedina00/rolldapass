import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { changeAdditionalCharset, ConfigState } from "../configSlice";
import CharFieldSet from "./CharFieldSet";

describe("additional chars fields", () => {
  const baseConfig: ConfigState = {
    length: 2,
    charsets: [],
    additionalChars: {
      include: "qwe",
      exclude: "asd",
    },
  };

  it("should reflect of both charsets from the store", () => {
    const { getByDisplayValue } = renderWithProviders(<CharFieldSet />, {
      preloadedState: { config: baseConfig },
    });

    expect(getByDisplayValue("qwe")).toBeInTheDocument();
    expect(getByDisplayValue("asd")).toBeInTheDocument();
  });

  it.each<["include" | "exclude", string]>([
    ["include", "including"],
    ["exclude", "excluding"],
  ])(
    "should dispatch the correct change actions in store",
    (charset: "include" | "exclude", value: string) => {
      const expectedStore = setupStore({ config: baseConfig });
      expectedStore.dispatch(changeAdditionalCharset({ charset, value }));

      const actualStore = setupStore({ config: baseConfig });

      const { getByDisplayValue } = renderWithProviders(<CharFieldSet />, {
        store: actualStore,
      });

      const input = getByDisplayValue(baseConfig.additionalChars[charset]);

      act(() => {
        fireEvent.change(input, { target: { value } });

        expect(expectedStore.getState()).toEqual(actualStore.getState());
      });
    }
  );

  it.each<["include" | "exclude", string]>([
    ["include", "including"],
    ["exclude", "excluding"],
  ])(
    "should reflect additional charset changes in store",
    (charset: "include" | "exclude", value: string) => {
      const store = setupStore({ config: baseConfig });

      const { getByDisplayValue } = renderWithProviders(<CharFieldSet />, {
        store,
      });

      const input = getByDisplayValue(
        baseConfig.additionalChars[charset]
      ) as HTMLInputElement;

      act(() => {
        store.dispatch(changeAdditionalCharset({ charset, value }));
      });

      expect(input.value).toEqual(value);
    }
  );
});
