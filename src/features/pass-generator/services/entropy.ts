import { PasswordMeter } from "password-meter";

const passwordMeter = new PasswordMeter();

export interface EntropyResult {
  strengthPercent: number;
  info: string;
}

export interface EntropyAlgorithm {
  label: string;
  calculator: (password: string) => EntropyResult;
}

const uic: EntropyAlgorithm = {
  label: "Password Meter / UIC",
  calculator: (password) => {
    const result = passwordMeter.getResult(password);

    return {
      strengthPercent: result.percent,
      info: `Score: ${result.score} points`,
    };
  },
};
