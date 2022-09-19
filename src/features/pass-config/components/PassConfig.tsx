import { Box, Grid, Slider, Stack, Typography } from "@mui/material";
import CharsetChip from "./CharsetChip";
import { charsetsBasic } from "../constants";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeLength } from "../configSlice";

const PassConfig = () => {
  const dispatch = useAppDispatch();
  const length = useAppSelector((state) => state.config.length);

  const handleLengthChange = (event: Event, newLength: number | number[]) => {
    dispatch(changeLength(newLength as number));
  };

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
        {charsetsBasic.map((charsetDef) => (
          <CharsetChip charsetDef={charsetDef} />
        ))}
      </Grid>
    </Box>
  );
};

export default PassConfig;
