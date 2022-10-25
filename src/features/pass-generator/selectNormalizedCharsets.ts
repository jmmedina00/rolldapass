import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Settings } from "../appbar-settings/constants";
import { ConfigState } from "../pass-config/configSlice";

const selectIsAdvanced = (state: RootState): boolean =>
  state.settings.toggle[Settings.AdvancedConfig];
const selectConfig = (state: RootState): ConfigState => state.config;

export const selectNormalizedCharsets = createSelector(
  [selectIsAdvanced, selectConfig],
  (
    isAdvanced: boolean,
    { charsets: { basic, advanced }, additionalChars: { include, exclude } }
  ): string[] => {
    if (!isAdvanced) {
      return [...basic];
    }

    const baseCharsets = [...basic, ...advanced];
    const sanitizedInclude = Array.from(
      new Set(
        include
          .split("")
          .filter(
            (char) =>
              baseCharsets.findIndex(
                (charset) => charset.indexOf(char) !== -1
              ) === -1
          )
      )
    ).join("");

    return [...baseCharsets, sanitizedInclude]
      .map((charset) =>
        charset
          .split("")
          .filter((char) => exclude.indexOf(char) === -1)
          .join("")
      )
      .filter((charset) => charset !== "");
  }
);
