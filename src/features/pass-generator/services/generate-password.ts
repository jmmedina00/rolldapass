export const generatePassword = (
  length: number,
  charsets: string[]
): string => {
  let password = "";

  const charsCombined = charsets.reduce(
    (collection, charset) => collection + charset,
    ""
  );

  do {
    const generatedPassword = Array.from(
      crypto.getRandomValues(new Uint32Array(length))
    )
      .map((n) => charsCombined[n % charsCombined.length])
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
