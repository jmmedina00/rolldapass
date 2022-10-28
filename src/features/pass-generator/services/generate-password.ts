export const generatePassword = (
  length: number,
  charsets: string[]
): string => {
  if (charsets.length === 0 || length < 2) {
    return "";
  }

  let password = "";

  const charsCombined = charsets.reduce(
    (collection, charset) => collection + charset,
    ""
  );

  do {
    const generatedPassword = Array.from(Array(length).keys())
      .map(() => {
        const index = Math.floor(Math.random() * charsCombined.length);
        return charsCombined[index];
      })
      .join("");

    const charsetsFirstFound = charsets.map((charset) =>
      charset
        .split("")
        .findIndex((char) => generatedPassword.indexOf(char) !== -1)
    );

    const missingCharsetsInPassword =
      charsetsFirstFound.filter((indexFound) => indexFound !== -1).length !==
      charsets.length;

    if (length > charsets.length && missingCharsetsInPassword) {
      continue;
    }

    password = generatedPassword;
  } while (password === "");

  return password;
};
