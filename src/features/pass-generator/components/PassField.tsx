import {
  FilledInput,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";
import { changePassword, checkIfPwned, resetPwned } from "../passwordSlice";
import { selectNormalizedCharsets } from "../selectNormalizedCharsets";
import { generatePassword } from "../services/generate-password";
import {
  clearClipboard,
  copyPasswordToClipboard,
} from "../thunks/notifiedClipboard";

const PassField = () => {
  const dispatch = useAppDispatch();

  const password = useAppSelector((state) => state.passwordGenerator.password);
  const charsets = useAppSelector(selectNormalizedCharsets);
  const length = useAppSelector((state) => state.config.length);
  const { [Settings.HaveIBeenPwned]: usePwned } = useAppSelector(
    (state) => state.settings.toggle
  );
  const disableCopyToClipboard = useAppSelector(
    (state) => usePwned && state.passwordGenerator.pwnedResult !== "good"
  );

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const pwnedTimer = useRef<number | undefined>(undefined);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePassword(event.target.value));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopyToClipboard = async () => {
    dispatch(copyPasswordToClipboard());
  };

  const refreshPassword = () => {
    const newPassword = generatePassword(length, charsets);
    if (newPassword) {
      dispatch(changePassword(newPassword));
    }
  };

  useEffect(refreshPassword, [length, charsets, dispatch]);

  useEffect(() => {
    dispatch(clearClipboard());
    dispatch(resetPwned());
    clearTimeout(pwnedTimer.current);
    pwnedTimer.current = undefined;

    if (!usePwned) {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(checkIfPwned(password));
      pwnedTimer.current = undefined;
    }, 2000);
    pwnedTimer.current = timeout as unknown as number;
  }, [password, usePwned, dispatch]);

  useKeyboardShortcut(
    ["Control", "C"],
    () => {
      if (disableCopyToClipboard) {
        return;
      }

      handleCopyToClipboard();
    },
    { overrideSystem: true, ignoreInputFields: false, repeatOnHold: false }
  );

  useKeyboardShortcut(["Control", "R"], refreshPassword, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  useKeyboardShortcut(["Alt", "V"], handleClickShowPassword, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  const passwordInputButtons = (
    <InputAdornment position="end">
      <Tooltip
        title={
          showPassword ? "Hide password (Alt + V)" : "Show password (Alt + V)"
        }
        placement="top"
      >
        <IconButton onClick={handleClickShowPassword}>
          <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Regenerate password (Ctrl + R)" placement="top">
        <span>
          <IconButton onClick={refreshPassword}>
            <Icon>cached</Icon>
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Copy password (Ctrl + C)" placement="top">
        <span>
          <IconButton
            onClick={handleCopyToClipboard}
            disabled={disableCopyToClipboard}
          >
            <Icon>content_paste</Icon>
          </IconButton>
        </span>
      </Tooltip>
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
