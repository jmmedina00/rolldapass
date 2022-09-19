import { Box, Chip, Grid, Slider, Stack, Typography } from "@mui/material";
import React from "react";
import { charsetsBasic } from "./constants";

const PassConfig = () => {
  const [length, setLength] = React.useState<number>(8);

  const handleLengthChange = (event: Event, newLength: number | number[]) => {
    setLength(newLength as number);
  };

  const charsetChips = charsetsBasic.map(({ label }) => (
    <Grid item>
      <Chip label={label} color="default" />
    </Grid>
  ));

  return (
    <Box p={3}>
      <Typography variant="h6">Password length</Typography>
      <Stack spacing={3} direction="row" alignItems="center">
        <Slider
          value={length}
          onChange={handleLengthChange}
          valueLabelDisplay="auto"
          min={2}
          max={128}
        />
        <Typography variant="subtitle2">{length}</Typography>
      </Stack>
      <Typography variant="h6">Character sets</Typography>
      <Grid container spacing={2}>
        {charsetChips}
      </Grid>
    </Box>
  );
};

export default PassConfig;
