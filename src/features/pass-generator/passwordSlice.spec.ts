import passwordReducer, { changePassword } from "./passwordSlice";

describe("password reducer", () => {
  it("should handle initial state", () => {
    expect(passwordReducer(undefined, { type: "???" })).toEqual({
      password: "",
    });
  });

  it("should handle password change", () => {
    expect(passwordReducer({ password: "old" }, changePassword("new"))).toEqual(
      { password: "new" }
    );
  });
});
