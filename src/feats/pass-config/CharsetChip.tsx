import { Chip, Grid } from "@mui/material";
import { CharsetDefinitionProperty } from "../../types/CharsetDefinition";

const CharsetChip = ({
  charsetDef: { label, charset },
}: CharsetDefinitionProperty) => (
  <Grid item>
    <Chip label={label} color="default" />
  </Grid>
);

export default CharsetChip;
