import passHealthReducer, { changeEntropy } from "./passHealthSlice";

describe("password health reducer", () => {
  it("should handle initial state", () => {
    expect(passHealthReducer(undefined, { type: "???" })).toEqual({
      entropy: "zxcvbn",
    });
  });

  it("should handle password change", () => {
    expect(
      passHealthReducer({ entropy: "zxcvbn" }, changeEntropy("uic"))
    ).toEqual({ entropy: "uic" });
  });
});
