import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeEntropy } from "../passHealthSlice";
import entropyService from "../services/entropy";

const entropyItems = entropyService.list.map((name) => [
  name,
  entropyService.algorithms[name].label,
]);

const EntropySelect = () => {
  const dispatch = useAppDispatch();
  const entropy = useAppSelector((state) => state.passwordHealth.entropy);

  const handleEntropyChange = (event: SelectChangeEvent) => {
    dispatch(changeEntropy(event.target.value));
  };

  return (
    <Grid sx={{ textAlign: "right" }}>
      <FormControl>
        <InputLabel>Entropy algorythm</InputLabel>
        <Select
          label="Entropy algorythm"
          variant="outlined"
          value={entropy}
          onChange={handleEntropyChange}
          sx={{ minWidth: 300, textAlign: "left" }}
        >
          {entropyItems.map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};
export default EntropySelect;
