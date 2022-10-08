import { Chip, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CharsetDefinitionProperty } from "../constants";
import { toggleCharset } from "../configSlice";

const CharsetChip = ({
  charsetDef: { label, charset, category },
}: CharsetDefinitionProperty) => {
  const dispatch = useAppDispatch();

  const enabled = useAppSelector((state) => {
    const activeCharsets = state.config.charsets[category];
    return !!activeCharsets.find((anyCharset) => anyCharset === charset);
  });

  const handleClick = () => {
    dispatch(toggleCharset({ charset, category }));
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
