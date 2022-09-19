import configReducer, {
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
    charsets: [SPECIAL_CHARACTERS, LETTERS_LOWERCASE],
  };
  it("should handle initial state", () => {
    expect(configReducer(undefined, { type: "???" })).toEqual({
      length: 8,
      charsets: [LETTERS_UPPERCASE, DIGITS],
    });
  });

  it("should handle length change", () => {
    const actual = configReducer(initialState, changeLength(12));
    expect(actual.length).toEqual(12);
  });

  it("should add a charset when it wasn't present before", () => {
    const actual = configReducer(initialState, toggleCharset(DIGITS));
    expect(actual.charsets).toEqual([
      SPECIAL_CHARACTERS,
      LETTERS_LOWERCASE,
      DIGITS,
    ]);
  });

  it("should remove a charset when it was present before", () => {
    const actual = configReducer(
      initialState,
      toggleCharset(SPECIAL_CHARACTERS)
    );
    expect(actual.charsets).toEqual([LETTERS_LOWERCASE]);
  });
});
