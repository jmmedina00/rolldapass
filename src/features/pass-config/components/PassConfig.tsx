import { Box, Grid, Typography } from "@mui/material";
import CharsetChip from "./CharsetChip";
import CharsetDefinition, {
  charsetsAdvanced,
  charsetsBasic,
} from "../constants";
import LengthSlider from "./LengthSlider";
import CharFieldSet from "./CharFieldSet";
import { useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";

const generateChips = (charsetDef: CharsetDefinition) => (
  <CharsetChip key={charsetDef.charset} {...charsetDef} />
);

const PassConfig = () => {
  const advancedConfig = useAppSelector(
    (state) => state.settings.toggle[Settings.AdvancedConfig]
  );

  return (
    <Box p={3}>
      <Typography variant="h6">Password length</Typography>
      <LengthSlider />

      <Typography variant="h6">Character sets</Typography>
      <Grid container spacing={2}>
        {advancedConfig
          ? charsetsAdvanced.map(generateChips)
          : charsetsBasic.map(generateChips)}
      </Grid>
      {advancedConfig && <CharFieldSet />}
    </Box>
  );
};

export default PassConfig;
