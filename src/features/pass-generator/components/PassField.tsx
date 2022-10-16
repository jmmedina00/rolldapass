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
import {
  NotificationType,
  setupNotification,
} from "../../notification/notificationSlice";
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

  const handleCopyToClipboard = async () => {
    await window.navigator.clipboard.writeText(password);
    dispatch(
      setupNotification({
        type: NotificationType.normal,
        message: "Password copied to clipboard",
        severity: "success",
      })
    );
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

    return [...baseCharsets, include]
      .map((charset) =>
        charset
          .split("")
          .filter((char) => config.additionalChars.exclude.indexOf(char) === -1)
          .join("")
      )
      .filter((charset) => charset !== "");
  };

  const refreshPassword = () => {
    const newPassword = generatePassword(
      config.length,
      advanced ? getAdvancedCharsets() : config.charsets.basic
    );
    dispatch(changePassword(newPassword));
    window.navigator.clipboard.writeText("");
  };

  useEffect(refreshPassword, [config, advanced, dispatch]);

  const passwordInputButtons = (
    <InputAdornment position="end">
      <IconButton onClick={handleClickShowPassword}>
        <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
      </IconButton>
      <IconButton onClick={refreshPassword}>
        <Icon>cached</Icon>
      </IconButton>
      <IconButton onClick={handleCopyToClipboard}>
        <Icon>content_paste</Icon>
      </IconButton>
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
