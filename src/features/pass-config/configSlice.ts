import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DIGITS, LETTERS_UPPERCASE } from "./constants";

interface ConfigState {
  length: number;
  charsets: string[];
}

const initialState: ConfigState = {
  length: 8,
  charsets: [LETTERS_UPPERCASE, DIGITS],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    changeLength: (state: ConfigState, action: PayloadAction<number>) => ({
      ...state,
      length: action.payload,
    }),
    toggleCharset: (state: ConfigState, action: PayloadAction<string>) => {
      const previousCharsets = state.charsets;
      const appendedCharsets = [...previousCharsets, action.payload];
      const appendedCharsetsSet = new Set(appendedCharsets);

      const charsets =
        appendedCharsets.length === appendedCharsetsSet.size
          ? [...appendedCharsets]
          : state.charsets.filter((charset) => charset !== action.payload);

      return { ...state, charsets };
    },
  },
});

export const { changeLength, toggleCharset } = configSlice.actions;
export default configSlice.reducer;
