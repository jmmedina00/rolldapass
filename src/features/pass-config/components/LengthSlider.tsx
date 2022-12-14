import { Slider, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeLength } from "../configSlice";

const LengthSlider = () => {
  const dispatch = useAppDispatch();
  const length = useAppSelector((state) => state.config.length);

  const handleLengthChange = (event: Event, newLength: number | number[]) => {
    const processedLength = newLength as number;
    if (length !== processedLength) {
      dispatch(changeLength(newLength as number));
    }
  };
  return (
    <Stack spacing={3} direction="row" alignItems="center">
      <Slider value={length} onChange={handleLengthChange} min={2} max={128} />
      <Typography variant="subtitle2">{length}</Typography>
    </Stack>
  );
};

export default LengthSlider;
