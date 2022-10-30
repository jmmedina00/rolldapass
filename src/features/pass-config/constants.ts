import { CharsetCategory } from "./configSlice";

export interface TranslatedLabel {
  key: string;
  clarification?: string;
}

export default interface CharsetDefinition {
  label: string | TranslatedLabel;
  charset: string;
  category: CharsetCategory;
}

export const LETTERS_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LETTERS_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const DIGITS = "0123456789";
export const SPECIAL_CHARACTERS = "#$%&@^`~";
export const PUNCTUATION = ".,:;";
export const QUOTATION = "\"'";
export const LINES = "\\/|_-";
export const OPERATIONS = "<*+!?=";

// Reimplement EASCII from: https://github.com/keepassxreboot/keepassxc/blob/develop/src/core/PasswordGenerator.cpp
// https://www.ascii-code.com/

const firstExtendedAsciiChar = 161;

export const EXTENDED_ASCII = String.fromCharCode(
  ...Array.from(Array(256 - firstExtendedAsciiChar).keys())
    .map((n) => n + firstExtendedAsciiChar)
    .filter((n) => n !== 0xad) // This one is not very useful
);

export const charsetsBasic: CharsetDefinition[] = [
  {
    label: { key: "charsets.uppercase", clarification: "A-Z" },
    charset: LETTERS_UPPERCASE,
    category: "basic",
  },
  {
    label: { key: "charsets.lowercase", clarification: "a-z" },
    charset: LETTERS_LOWERCASE,
    category: "basic",
  },
  {
    label: { key: "charsets.numbers", clarification: "0-9" },
    charset: DIGITS,
    category: "basic",
  },
  {
    label: { key: "charsets.special" },
    charset: SPECIAL_CHARACTERS,
    category: "basic",
  },
  {
    label: { key: "charsets.extended" },
    charset: EXTENDED_ASCII,
    category: "basic",
  },
];

export const charsetsAdvanced: CharsetDefinition[] = [
  { label: "A-Z", charset: LETTERS_UPPERCASE, category: "basic" },
  { label: "a-z", charset: LETTERS_LOWERCASE, category: "basic" },
  { label: "0-9", charset: DIGITS, category: "basic" },
  {
    label: SPECIAL_CHARACTERS,
    charset: SPECIAL_CHARACTERS,
    category: "basic",
  },
  {
    label: { key: "charsets.extended" },
    charset: EXTENDED_ASCII,
    category: "basic",
  },
  { label: PUNCTUATION, charset: PUNCTUATION, category: "advanced" },
  { label: QUOTATION, charset: QUOTATION, category: "advanced" },
  { label: LINES, charset: LINES, category: "advanced" },
  { label: OPERATIONS, charset: OPERATIONS, category: "advanced" },
];
