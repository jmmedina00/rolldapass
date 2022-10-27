import { Grid, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeAdditionalCharset } from "../configSlice";

const CharFieldSet = () => {
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
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item sm={6} xs={12}>
        <TextField
          label="Include characters"
          fullWidth
          variant="outlined"
          value={include}
          onChange={changeValue("include")}
        ></TextField>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TextField
          label="Exclude characters"
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
