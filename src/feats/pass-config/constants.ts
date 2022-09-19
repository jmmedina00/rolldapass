import CharsetDefinition from "../../types/CharsetDefinition";

const LETTERS_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LETTERS_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL_CHARACTERS = "#$%&@^`~";

export const charsetsBasic: CharsetDefinition[] = [
  { label: "Uppercase (A-Z)", charset: LETTERS_UPPERCASE },
  { label: "Lowercase (a-z)", charset: LETTERS_LOWERCASE },
  { label: "Numbers (0-9)", charset: DIGITS },
  { label: "Special characters", charset: SPECIAL_CHARACTERS },
];
