import { Box, Grid, Typography } from "@mui/material";
import CharsetChip from "./CharsetChip";
import { charsetsBasic } from "../constants";
import LengthSlider from "./LengthSlider";
import CharFieldSet from "./CharFieldSet";

const PassConfig = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Password length</Typography>
      <LengthSlider />

      <Typography variant="h6">Character sets</Typography>
      <Grid container spacing={2}>
        {charsetsBasic.map((charsetDef) => (
          <CharsetChip key={charsetDef.charset} charsetDef={charsetDef} />
        ))}
      </Grid>
      <CharFieldSet />
    </Box>
  );
};

export default PassConfig;
