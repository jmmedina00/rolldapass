import { Chip, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CharsetDefinition from "../constants";
import { toggleCharset } from "../configSlice";

const CharsetChip = ({ label, charset, category }: CharsetDefinition) => {
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
