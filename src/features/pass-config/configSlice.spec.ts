import configReducer, {
  changeAdditionalCharset,
  changeLength,
  ConfigState,
  toggleCharset,
} from "./configSlice";
import {
  DIGITS,
  LETTERS_LOWERCASE,
  LETTERS_UPPERCASE,
  SPECIAL_CHARACTERS,
} from "./constants";

describe("config reducer", () => {
  const initialState: ConfigState = {
    length: 10,
    charsets: { basic: [SPECIAL_CHARACTERS, LETTERS_LOWERCASE], advanced: [] },
    additionalChars: { exclude: "qwe", include: "" },
  };
  it("should handle initial state", () => {
    expect(configReducer(undefined, { type: "???" })).toEqual({
      length: 8,
      charsets: { basic: [LETTERS_UPPERCASE, DIGITS], advanced: [] },
      additionalChars: { exclude: "", include: "" },
    });
  });

  it("should handle length change", () => {
    const actual = configReducer(initialState, changeLength(12));
    expect(actual.length).toEqual(12);
  });

  it("should add a charset when it wasn't present before", () => {
    const actual = configReducer(
      initialState,
      toggleCharset({ charset: DIGITS, category: "advanced" })
    );
    expect(actual.charsets.advanced).toEqual([DIGITS]);
  });

  it("should remove a charset when it was present before", () => {
    const actual = configReducer(
      initialState,
      toggleCharset({ charset: SPECIAL_CHARACTERS, category: "basic" })
    );
    expect(actual.charsets.basic).toEqual([LETTERS_LOWERCASE]);
  });

  it("should update an additional charset", () => {
    const actual = configReducer(
      initialState,
      changeAdditionalCharset({ charset: "exclude", value: "asd" })
    );

    expect(actual.additionalChars.exclude).toEqual("asd");
  });
});
