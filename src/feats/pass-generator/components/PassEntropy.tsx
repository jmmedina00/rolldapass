import {
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const PassEntropy = () => (
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
          value={"zxcvbn"}
          sx={{ minWidth: 300, textAlign: "left" }}
        >
          <MenuItem value="zxcvbn">zxcvbn</MenuItem>
          <MenuItem value="uic">UIC</MenuItem>
          <MenuItem value="tai">Tai-Password-Strength</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Box>
);

export default PassEntropy;
