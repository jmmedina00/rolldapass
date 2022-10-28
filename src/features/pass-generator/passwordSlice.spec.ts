import passwordReducer, {
  changePassword,
  clearTimeoutId,
  resetPwned,
  setTimeoutId,
} from "./passwordSlice";

describe("password reducer", () => {
  it("should handle initial state", () => {
    expect(passwordReducer(undefined, { type: "???" })).toEqual({
      password: "",
      copiedTimeout: undefined,
      pwnedResult: "none",
    });
  });

  it("should handle password change", () => {
    expect(
      passwordReducer(
        { password: "old", copiedTimeout: undefined, pwnedResult: "none" },
        changePassword("new")
      )
    ).toEqual({
      password: "new",
      copiedTimeout: undefined,
      pwnedResult: "none",
    });
  });

  describe("copy timeout id", () => {
    it("should handle setting", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: undefined, pwnedResult: "none" },
          setTimeoutId(12)
        )
      ).toEqual({ password: "old", copiedTimeout: 12, pwnedResult: "none" });
    });

    it("should handle clearing", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: 12, pwnedResult: "none" },
          clearTimeoutId()
        ).copiedTimeout
      ).toBeFalsy();
    });
  });

  describe("pwned extra cases", () => {
    it("should handle pending", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: 12, pwnedResult: "none" },
          { type: "passwordGenerator/checkIfPwned/pending" }
        )
      ).toEqual({ password: "old", copiedTimeout: 12, pwnedResult: "pending" });
    });

    it("should set result to bad if query is sucessful", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: 12, pwnedResult: "none" },
          { type: "passwordGenerator/checkIfPwned/fulfilled", payload: true }
        )
      ).toEqual({ password: "old", copiedTimeout: 12, pwnedResult: "bad" });
    });

    it("should set result to good if query is not sucessful", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: 12, pwnedResult: "none" },
          { type: "passwordGenerator/checkIfPwned/fulfilled", payload: false }
        )
      ).toEqual({ password: "old", copiedTimeout: 12, pwnedResult: "good" });
    });

    it("should set result to error when something goes wrong", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: 12, pwnedResult: "none" },
          { type: "passwordGenerator/checkIfPwned/rejected" }
        )
      ).toEqual({ password: "old", copiedTimeout: 12, pwnedResult: "error" });
    });

    it("should handle resetting", () => {
      expect(
        passwordReducer(
          { password: "old", copiedTimeout: 12, pwnedResult: "good" },
          resetPwned()
        )
      ).toEqual({ password: "old", copiedTimeout: 12, pwnedResult: "none" });
    });
  });
});
