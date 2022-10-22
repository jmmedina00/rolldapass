import { SHA1 } from "crypto-js";

export const checkPassword = async (password: string): Promise<boolean> => {
  const passwordHash = SHA1(password).toString();
  const [_, hashStart] = passwordHash.match(/^(.{5}).+$/) as string[];

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${hashStart}`
  );
  const result = await response.text();

  const resultingHashes = result
    .split("\r\n")
    .map((line) => {
      const [halfHash, occurrences] = line.split(":");
      return { hash: hashStart + halfHash, occurrences: +occurrences };
    })
    .filter(({ occurrences }) => occurrences > 0)
    .map(({ hash }) => hash.toLowerCase());

  return !!resultingHashes.find((hash) => hash === passwordHash);
};
