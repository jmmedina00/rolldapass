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
import { Settings } from "../../appbar-settings/constants";
import { changePassword } from "../passwordSlice";
import { generatePassword } from "../services/generate-password";

const PassField = () => {
  const dispatch = useAppDispatch();

  const password = useAppSelector((state) => state.passwordGenerator.password);
  const config = useAppSelector((state) => state.config);
  const advanced = useAppSelector(
    (state) => state.settings.toggle[Settings.AdvancedConfig]
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePassword(event.target.value));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getAdvancedCharsets = () => {
    const baseCharsets = [
      ...config.charsets.basic,
      ...config.charsets.advanced,
    ];
    const include = Array.from(
      new Set(
        config.additionalChars.include
          .split("")
          .filter(
            (char) =>
              baseCharsets.findIndex(
                (charset) => charset.indexOf(char) !== -1
              ) === -1
          )
      )
    ).join("");

    return [...baseCharsets, include].map((charset) =>
      charset
        .split("")
        .filter((char) => config.additionalChars.exclude.indexOf(char) === -1)
        .join("")
    );
  };

  useEffect(() => {
    const newPassword = generatePassword(
      config.length,
      advanced ? getAdvancedCharsets() : config.charsets.basic
    );
    dispatch(changePassword(newPassword));
  }, [config, advanced, dispatch]);

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
