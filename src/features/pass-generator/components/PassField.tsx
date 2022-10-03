import {
  FilledInput,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changePassword } from "../passwordSlice";
import { generatePassword } from "../services/generate-password";

const PassField = () => {
  const dispatch = useAppDispatch();

  const password = useAppSelector((state) => state.passwordGenerator.password);
  const config = useAppSelector((state) => state.config);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePassword(event.target.value));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const newPassword = generatePassword(config.length, config.charsets);
    dispatch(changePassword(newPassword));
  }, [config, dispatch]);

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
    <FormControl variant="filled" fullWidth>
      <InputLabel>Generate your password</InputLabel>
      <FilledInput
        endAdornment={passwordInputButtons}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
      />
    </FormControl>
  );
};
export default PassField;
