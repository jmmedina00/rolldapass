import { generatePassword } from "./generate-password";

describe("password generation", () => {
  const lengthsToTest = Array.from(Array(30).keys()).map((n) => n + 2);

  it.each(lengthsToTest)(
    "should generate a password of specified length",
    (length: number) => {
      const password = generatePassword(length, ["ABCD", "1234"]);
      expect(password.length).toEqual(length);
    }
  );

  it("should generate a password with chars from all charsets", () => {
    const charsets = ["abcd", "ABCD", "1234", "56789", "QRST", "qrst"];
    const password = generatePassword(8, charsets);

    const indexes = charsets.map((charset) =>
      charset.split("").findIndex((char) => password.indexOf(char) !== -1)
    );

    expect(indexes).not.toContain(-1);
  });
});
