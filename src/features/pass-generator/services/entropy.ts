import { PasswordMeter } from "password-meter";
import { PasswordStrength } from "tai-password-strength";
import PasswordQualityCalculator from "password-quality-calculator";
import zxcvbn from "zxcvbn";

const passwordMeter = new PasswordMeter();
const taiStrength = new PasswordStrength();
const taiCodes = ["VERY_WEAK", "WEAK", "REASONABLE", "STRONG", "VERY_STRONG"];

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

const shannon: EntropyAlgorithm = {
  label: "TAI Shannon",
  calculator: (password) => {
    const result = taiStrength.check(password);

    return {
      strengthPercent:
        (taiCodes.indexOf(result.strengthCode) / (taiCodes.length - 1)) * 100,
      info: `Entropy: ${result.shannonEntropyBits} bits`,
    };
  },
};

const keepass: EntropyAlgorithm = {
  label: "KeePass",
  calculator: (password) => {
    const entropy = PasswordQualityCalculator(password);

    return {
      strengthPercent: (entropy / 128) * 100,
      info: `Entropy: ${entropy} bits`,
    };
  },
};

const zxcvbnAlgorithm: EntropyAlgorithm = {
  label: "zxcvbn",
  calculator: (password) => {
    const result = zxcvbn(password);

    return {
      info: `Strength: ${result.guesses_log10}`,
      strengthPercent: (result.score / 4) * 100,
    };
  },
};

const algorithms: { [key: string]: EntropyAlgorithm } = {
  uic,
  shannon,
  keepass,
  zxcvbn: zxcvbnAlgorithm,
};

const list = Object.keys(algorithms);

const exported = { algorithms, list };
export default exported;
