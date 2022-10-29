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
import { useTranslation } from "react-i18next";

const generateChips = (charsetDef: CharsetDefinition) => (
  <CharsetChip key={charsetDef.charset} {...charsetDef} />
);

const PassConfig = () => {
  const { t } = useTranslation("config");

  const advancedConfig = useAppSelector(
    (state) => state.settings.toggle[Settings.AdvancedConfig]
  );

  return (
    <Box p={3}>
      <Typography variant="h6">{t("length")}</Typography>
      <LengthSlider />

      <Typography variant="h6">{t("charsetsLabel")}</Typography>
      <Grid
        container
        columnSpacing={{ md: 2, xs: 1 }}
        rowSpacing={1}
        sx={{ marginTop: 0, marginBottom: 2 }}
      >
        {advancedConfig
          ? charsetsAdvanced.map(generateChips)
          : charsetsBasic.map(generateChips)}
      </Grid>
      {advancedConfig && <CharFieldSet />}
    </Box>
  );
};

export default PassConfig;
