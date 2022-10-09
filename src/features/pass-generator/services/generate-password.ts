export const generatePassword = (
  length: number,
  charsets: string[]
): string => {
  const charsetChoices = crypto
    .getRandomValues(new Uint32Array(length))
    .map((n) => n % charsets.length);

  const charChoices = crypto
    .getRandomValues(new Uint32Array(length))
    .map((value, index) => value % charsets[charsetChoices[index]].length);

  return Array.from(charsetChoices)
    .map((choice, index) => charsets[choice][charChoices[index]])
    .join("");
};
