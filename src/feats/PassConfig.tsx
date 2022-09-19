import { Box, Chip, Grid, Slider, Stack, Typography } from "@mui/material";

const PassConfig = () => (
  <Box p={3}>
    <Typography variant="h6">Password length</Typography>
    <Stack spacing={3} direction="row" alignItems="center">
      <Slider defaultValue={8} valueLabelDisplay="auto" min={2} max={128} />
      <Typography variant="subtitle2">32</Typography>
    </Stack>
    <Typography variant="h6">Character sets</Typography>
    <Grid container spacing={2}>
      <Grid item>
        <Chip label="Uppercase (A-Z)" color="default" />
      </Grid>
      <Grid item>
        <Chip label="Lowercase (a-z)" color="default" />
      </Grid>
      <Grid item>
        <Chip label="Numbers (0-9)" color="default" />
      </Grid>
      <Grid item>
        <Chip label="Special characters" color="default" />
      </Grid>
    </Grid>
  </Box>
);

export default PassConfig;
