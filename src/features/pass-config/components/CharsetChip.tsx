import { Chip, Grid } from "@mui/material";
import { useState } from "react";
import { CharsetDefinitionProperty } from "../../../types/CharsetDefinition";

const CharsetChip = ({
  charsetDef: { label, charset },
}: CharsetDefinitionProperty) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  return (
    <Grid item>
      <Chip
        label={label}
        color={enabled ? "primary" : "default"}
        onClick={handleClick}
      />
    </Grid>
  );
};

export default CharsetChip;
