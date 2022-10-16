import passwordReducer, {
  changePassword,
  clearTimeoutId,
  setTimeoutId,
} from "./passwordSlice";

describe("password reducer", () => {
  it("should handle initial state", () => {
    expect(passwordReducer(undefined, { type: "???" })).toEqual({
      password: "",
      copiedTimeout: undefined,
    });
  });

  it("should handle password change", () => {
    expect(
      passwordReducer(
        { password: "old", copiedTimeout: undefined },
        changePassword("new")
      )
    ).toEqual({ password: "new", copiedTimeout: undefined });
  });

  it("should handle copy timeout setting", () => {
    expect(
      passwordReducer(
        { password: "old", copiedTimeout: undefined },
        setTimeoutId(12)
      )
    ).toEqual({ password: "old", copiedTimeout: 12 });
  });

  it("should handle copy timeout clearing", () => {
    expect(
      passwordReducer({ password: "old", copiedTimeout: 12 }, clearTimeoutId())
        .copiedTimeout
    ).toBeFalsy();
  });
});
