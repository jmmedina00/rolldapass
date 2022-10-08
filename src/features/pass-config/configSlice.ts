import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DIGITS, LETTERS_UPPERCASE } from "./constants";

export type CharsetCategory = "basic" | "advanced";

export interface CharsetToggle {
  category: CharsetCategory;
  charset: string;
}

export interface ConfigState {
  length: number;
  charsets: {
    basic: string[];
    advanced: string[];
  };
  additionalChars: {
    include: string;
    exclude: string;
  };
}

interface AdditionalCharsetChange {
  charset: "include" | "exclude";
  value: string;
}

const initialState: ConfigState = {
  length: 8,
  charsets: { basic: [LETTERS_UPPERCASE, DIGITS], advanced: [] },
  additionalChars: { include: "", exclude: "" },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    changeLength: (state: ConfigState, action: PayloadAction<number>) => ({
      ...state,
      length: action.payload,
    }),
    toggleCharset: (
      state: ConfigState,
      action: PayloadAction<CharsetToggle>
    ) => {
      const { category, charset } = action.payload;

      const previousCharsets = state.charsets[category];
      const appendedCharsets = [...previousCharsets, charset];
      const appendedCharsetsSet = new Set(appendedCharsets);

      const charsets =
        appendedCharsets.length === appendedCharsetsSet.size
          ? [...appendedCharsets]
          : previousCharsets.filter((c) => c !== charset);

      return {
        ...state,
        charsets: { ...state.charsets, [category]: charsets },
      };
    },
    changeAdditionalCharset: (
      state: ConfigState,
      action: PayloadAction<AdditionalCharsetChange>
    ) => {
      return {
        ...state,
        additionalChars: {
          ...state.additionalChars,
          [action.payload.charset]: action.payload.value,
        },
      };
    },
  },
});

export const { changeLength, toggleCharset, changeAdditionalCharset } =
  configSlice.actions;
export default configSlice.reducer;
