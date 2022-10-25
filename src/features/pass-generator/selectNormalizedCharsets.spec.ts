import { setupStore } from "../../app/store";
import { Settings } from "../appbar-settings/constants";
import { selectNormalizedCharsets } from "./selectNormalizedCharsets";

describe("charset normalization selection", () => {
  it("should return the basic charsets when not in advanced config", () => {
    const store = setupStore({
      config: {
        length: 3,
        charsets: { basic: ["ABCD"], advanced: ["1234"] },
        additionalChars: { include: "&", exclude: "B" },
      },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.AdvancedConfig]: false },
      },
    });

    const result = selectNormalizedCharsets(store.getState());
    expect(result).toEqual(["ABCD"]);
  });

  it("should assemble full charset list properly with no repeats", () => {
    const store = setupStore({
      config: {
        length: 3,
        charsets: { basic: ["ABCD"], advanced: ["1234"] },
        additionalChars: { include: "&2", exclude: "B" },
      },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.AdvancedConfig]: true },
      },
    });

    const result = selectNormalizedCharsets(store.getState());
    expect(result).toEqual(["ACD", "1234", "&"]);
  });

  it("should not leave an empty string due to include", () => {
    const store = setupStore({
      config: {
        length: 3,
        charsets: { basic: ["ABCD"], advanced: ["1234"] },
        additionalChars: { include: "", exclude: "" },
      },
      settings: {
        settingsOpen: false,
        aboutOpen: false,
        toggle: { [Settings.AdvancedConfig]: true },
      },
    });

    const result = selectNormalizedCharsets(store.getState());
    expect(result).toEqual(["ABCD", "1234"]);
  });
});
