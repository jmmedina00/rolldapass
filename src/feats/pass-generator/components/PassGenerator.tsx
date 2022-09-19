import {
  Box,
  FilledInput,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import PassEntropy from "./PassEntropy";

const PassGenerator = () => {
  const passwordInputButtons = (
    <InputAdornment position="end">
      <Icon sx={{ mr: 0.5 }}>visibility_off</Icon>
      <Icon sx={{ mr: 0.5 }}>cached</Icon>
      <Icon>content_paste</Icon>
    </InputAdornment>
  );

  return (
    <Box p={3}>
      <FormControl variant="filled" fullWidth>
        <InputLabel>Generate your password</InputLabel>
        <FilledInput endAdornment={passwordInputButtons} />
      </FormControl>

      <PassEntropy />
    </Box>
  );
};

export default PassGenerator;
