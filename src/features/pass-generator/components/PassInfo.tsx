import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";
import {
  Notification,
  NotificationType,
  setupNotification,
} from "../../notification/notificationSlice";
import { PasswordState } from "../passwordSlice";

const colors: {
  [key in PasswordState["pwnedResult"]]: LinearProgressProps["color"];
} = {
  none: "secondary",
  pending: "secondary",
  good: "success",
  bad: "error",
  error: "error",
};

const notifications: { [key: string]: Notification } = {
  success: {
    type: NotificationType.normal,
    message: "pwned.good",
    severity: "success",
  },
  error: {
    type: NotificationType.pwned,
    message: "pwned.bad",
    severity: "error",
  },
};

const PassInfo = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("passgen");
  const password = useAppSelector((state) => state.passwordGenerator.password);
  const entropy = useAppSelector((state) => state.passwordHealth.entropy);
  const color = useAppSelector((state) =>
    !state.settings.toggle[Settings.HaveIBeenPwned]
      ? "primary"
      : colors[state.passwordGenerator.pwnedResult]
  );
  const calculateEntropy = useAppSelector(
    (state) => state.settings.toggle[Settings.Entropy]
  );

  const [percent, setPercent] = useState<number>(0);
  const [displayInfo, setInfo] = useState<string>("");

  useEffect(() => {
    if (!calculateEntropy) {
      setPercent(0);
      return;
    }

    import("../services/entropy").then(({ default: entropyService }) => {
      const { numericResult, strengthPercent } =
        entropyService.algorithms[entropy].calculator(password);
      setPercent(strengthPercent);
      setInfo(
        t("entropyResults." + entropy, { result: numericResult }) as string
      );
    });
  }, [password, entropy, calculateEntropy, t]);

  useEffect(() => {
    if (!(color && ["success", "error"].includes(color))) {
      return;
    }
    dispatch(setupNotification(notifications[color]));
  }, [color, dispatch]);

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 8, borderRadius: 4 }}
        color={color}
      />
      <Typography
        variant="overline"
        align="right"
        paragraph={true}
        display={calculateEntropy ? "inherit" : "none"}
      >
        {displayInfo}
      </Typography>
    </Box>
  );
};

export default PassInfo;
