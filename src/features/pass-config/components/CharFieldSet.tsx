import { Grid, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeAdditionalCharset } from "../configSlice";

const CharFieldSet = () => {
  const { t } = useTranslation("config");
  const dispatch = useAppDispatch();

  const include = useAppSelector(
    (state) => state.config.additionalChars.include
  );
  const exclude = useAppSelector(
    (state) => state.config.additionalChars.exclude
  );

  const changeValue =
    (charset: "include" | "exclude") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeAdditionalCharset({ charset, value: event.target.value }));
    };

  return (
    <Grid
      container
      columnSpacing={{ sm: 3, xs: 0 }}
      rowSpacing={{ xs: 2, sm: 0 }}
      sx={{ mt: 1 }}
    >
      <Grid item sm={6} xs={12}>
        <TextField
          label={t("includeCharacters")}
          fullWidth
          variant="outlined"
          value={include}
          onChange={changeValue("include")}
        ></TextField>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          label={t("excludeCharacters")}
          fullWidth
          variant="outlined"
          value={exclude}
          onChange={changeValue("exclude")}
        ></TextField>
      </Grid>
    </Grid>
  );
};
export default CharFieldSet;
