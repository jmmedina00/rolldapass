import {
  Box,
  FilledInput,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import PassEntropy from "./PassEntropy";

const PassGenerator = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputButtons = (
    <InputAdornment position="end">
      <IconButton onClick={handleClickShowPassword}>
        <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
      </IconButton>
      <Icon>cached</Icon>
      <Icon>content_paste</Icon>
    </InputAdornment>
  );

  return (
    <Box p={3}>
      <FormControl variant="filled" fullWidth>
        <InputLabel>Generate your password</InputLabel>
        <FilledInput
          endAdornment={passwordInputButtons}
          type={showPassword ? "text" : "password"}
        />
      </FormControl>

      <PassEntropy />
    </Box>
  );
};

export default PassGenerator;
