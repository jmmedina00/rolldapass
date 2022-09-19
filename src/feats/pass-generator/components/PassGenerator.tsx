import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const PassGenerator = () => (
  <Box p={3}>
    <TextField
      variant="filled"
      type="password"
      label="Generate your password"
      fullWidth
    />
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

export default PassGenerator;
