import settingsReducer, {
  closeAbout,
  initializeSetting,
  openAbout,
  SettingsState,
  toggleDrawer,
  toggleSetting,
} from "./settingsSlice";

describe("settings reducer", () => {
  const initialState: SettingsState = {
    settingsOpen: false,
    aboutOpen: false,
    toggle: {
      done: true,
      pending: false,
    },
  };

  it("should handle initial state", () => {
    expect(settingsReducer(undefined, { type: "???" })).toEqual({
      settingsOpen: false,
      aboutOpen: false,
      toggle: {},
    });
  });

  it("should toggle settings drawer", () => {
    expect(
      settingsReducer(initialState, toggleDrawer()).settingsOpen
    ).toBeTruthy();
  });

  it("should toggle settings drawer (2)", () => {
    expect(
      settingsReducer({ ...initialState, settingsOpen: true }, toggleDrawer())
        .settingsOpen
    ).toBeFalsy();
  });

  it("should set a setting that is true to false", () => {
    expect(
      settingsReducer(initialState, toggleSetting("done")).toggle["done"]
    ).toBeFalsy();
  });

  it("should set a setting that is false to true", () => {
    expect(
      settingsReducer(initialState, toggleSetting("pending")).toggle["pending"]
    ).toBeTruthy();
  });

  it("should set a new setting to true by default", () => {
    expect(
      settingsReducer(initialState, toggleSetting("unknown")).toggle["unknown"]
    ).toBeTruthy();
  });

  it("should initialize a setting as false", () => {
    expect(
      settingsReducer(initialState, initializeSetting("unknown")).toggle[
        "unknown"
      ]
    ).toBeFalsy();
  });

  it("should open the about", () => {
    expect(settingsReducer(initialState, openAbout()).aboutOpen).toBeTruthy();
  });

  it("should open the about", () => {
    expect(
      settingsReducer({ ...initialState, aboutOpen: true }, closeAbout())
        .aboutOpen
    ).toBeFalsy();
  });
});
