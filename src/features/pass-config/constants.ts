import { CharsetCategory } from "./configSlice";

export default interface CharsetDefinition {
  label: string;
  charset: string;
  category: CharsetCategory;
}

export interface CharsetDefinitionProperty {
  charsetDef: CharsetDefinition;
}

export const LETTERS_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LETTERS_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const DIGITS = "0123456789";
export const SPECIAL_CHARACTERS = "#$%&@^`~";

export const charsetsBasic: CharsetDefinition[] = [
  { label: "Uppercase (A-Z)", charset: LETTERS_UPPERCASE, category: "basic" },
  { label: "Lowercase (a-z)", charset: LETTERS_LOWERCASE, category: "basic" },
  { label: "Numbers (0-9)", charset: DIGITS, category: "basic" },
  {
    label: "Special characters",
    charset: SPECIAL_CHARACTERS,
    category: "basic",
  },
];
