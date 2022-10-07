import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const CharFieldSet = () => {
  const [include, setInclude] = useState<string>("");
  const [exclude, setExclude] = useState<string>("");

  const changeValue =
    (charset: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (charset) {
        case "include":
          setInclude(event.target.value);
          break;
        case "exclude":
          setExclude(event.target.value);
          break;
        default:
          console.log("None");
      }
    };

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={6}>
        <TextField
          label="Include characters"
          fullWidth
          variant="outlined"
          value={include}
          onChange={changeValue("include")}
        ></TextField>
      </Grid>
      <Grid item xs={6}>
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
