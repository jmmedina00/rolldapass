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
import { useState } from "react";

const entropyList = {
  zxcvbn: "zxcvbn",
  uic: "UIC",
  tai: "Tai-Password-Strength",
};

const PassEntropy = () => {
  const [entropy, setEntropy] = useState<string>("zxcvbn");

  const handleEntropyChange = (event: SelectChangeEvent) => {
    setEntropy(event.target.value);
  };

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={78}
        sx={{ height: 8, borderRadius: 4 }}
      />
      <Typography variant="overline" align="right" paragraph={true}>
        Entropy: 78 bit
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
            {Object.entries(entropyList).map(([key, label]) => (
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
