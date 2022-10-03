import {
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeEntropy } from "../passHealthSlice";
import entropyService from "../services/entropy";

const entropyItems = entropyService.list.map((name) => [
  name,
  entropyService.algorithms[name].label,
]);

const PassEntropy = () => {
  const dispatch = useAppDispatch();
  const password = useAppSelector((state) => state.passwordGenerator.password);
  const entropy = useAppSelector((state) => state.passwordHealth.entropy);

  const [percent, setPercent] = useState<number>(0);
  const [displayInfo, setInfo] = useState<string>("");

  const handleEntropyChange = (event: SelectChangeEvent) => {
    dispatch(changeEntropy(event.target.value));
  };

  useEffect(() => {
    const { info, strengthPercent } =
      entropyService.algorithms[entropy].calculator(password);
    setPercent(strengthPercent);
    setInfo(info);
  }, [password, entropy]);

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Typography variant="overline" align="right" paragraph={true}>
        {displayInfo}
      </Typography>
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
    </Box>
  );
};

export default PassEntropy;
