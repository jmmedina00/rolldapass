import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeNotification } from "../notificationSlice";

const ClipboardClearButton = () => {
  const severity = useAppSelector((state) => state.notification.severity);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    await window.navigator.clipboard.writeText("");
    dispatch(closeNotification());
  };

  return (
    <Button size="small" color={severity} onClick={handleClick}>
      Clear manually
    </Button>
  );
};

export default ClipboardClearButton;
