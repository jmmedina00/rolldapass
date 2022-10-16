import { setupStore } from "../../app/store";
import { clearClipboard, copyPasswordToClipboard } from "./clipboardThunk";

// https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("clipboard thunks", () => {
  jest.spyOn(navigator.clipboard, "writeText");

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should remove timeout reference when clearing clipboard", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
    });
    await clearClipboard()(store.dispatch, store.getState, null);

    expect(store.getState().passwordGenerator.copiedTimeout).toBeFalsy();
  });

  it("should handle clearing the clipboard", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: 12 },
    });
    await clearClipboard()(store.dispatch, store.getState, null);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("should create a timer and reflect it in the store when copying pass to clipboard", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: undefined },
    });
    await copyPasswordToClipboard()(store.dispatch, store.getState, null);

    expect(store.getState().passwordGenerator.copiedTimeout).toBeTruthy();
    expect(jest.getTimerCount()).toEqual(1);
  });

  it("should copy the password to clipboard", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: undefined },
    });
    await copyPasswordToClipboard()(store.dispatch, store.getState, null);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("old");
  });

  it("should remove timer reference when copy timer runs out", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: undefined },
    });
    await copyPasswordToClipboard()(store.dispatch, store.getState, null);

    jest.runAllTimers();

    expect(store.getState().passwordGenerator.copiedTimeout).toBeFalsy();
    expect(jest.getTimerCount()).toEqual(0);
  });

  it("should clear clipboard when copy timer runs out", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: undefined },
    });
    await copyPasswordToClipboard()(store.dispatch, store.getState, null);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("old");

    jest.runAllTimers();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("should create a timer to clear that lasts 10 seconds", async () => {
    const store = setupStore({
      passwordGenerator: { password: "old", copiedTimeout: undefined },
    });
    await copyPasswordToClipboard()(store.dispatch, store.getState, null);

    jest.advanceTimersByTime(10000);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });
});
