import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";
import { PasswordState } from "../passwordSlice";
import entropyService from "../services/entropy";

const colors: {
  [key in PasswordState["pwnedResult"]]: LinearProgressProps["color"];
} = {
  none: "secondary",
  pending: "secondary",
  good: "success",
  bad: "error",
  error: "error",
};

const PassEntropy = () => {
  const password = useAppSelector((state) => state.passwordGenerator.password);
  const entropy = useAppSelector((state) => state.passwordHealth.entropy);
  const color = useAppSelector((state) =>
    !state.settings.toggle[Settings.HaveIBeenPwned]
      ? "primary"
      : colors[state.passwordGenerator.pwnedResult]
  );

  const [percent, setPercent] = useState<number>(0);
  const [displayInfo, setInfo] = useState<string>("");

  useEffect(() => {
    const { info, strengthPercent } =
      entropyService.algorithms[entropy].calculator(password);
    setPercent(strengthPercent);
    setInfo(info);
  }, [password, entropy]);

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 8, borderRadius: 4 }}
        color={color}
      />
      <Typography variant="overline" align="right" paragraph={true}>
        {displayInfo}
      </Typography>
    </Box>
  );
};

export default PassEntropy;
