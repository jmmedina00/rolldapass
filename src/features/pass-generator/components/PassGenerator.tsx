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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changePassword } from "../passwordSlice";
import PassEntropy from "./PassEntropy";

const PassGenerator = () => {
  const dispatch = useAppDispatch();
  const password = useAppSelector((state) => state.passwordGenerator.password);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePassword(event.target.value));
  };

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
          value={password}
          onChange={handlePasswordChange}
        />
      </FormControl>

      <PassEntropy />
    </Box>
  );
};

export default PassGenerator;
