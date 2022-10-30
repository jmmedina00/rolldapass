import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeNotification } from "../notificationSlice";

const ClipboardClearButton = () => {
  const severity = useAppSelector((state) => state.notification.severity);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("notification");

  const handleClick = async () => {
    await window.navigator.clipboard.writeText("");
    dispatch(closeNotification());
  };

  return (
    <Button size="small" color={severity} onClick={handleClick}>
      {t("clipboard.clear")}
    </Button>
  );
};

export default ClipboardClearButton;
