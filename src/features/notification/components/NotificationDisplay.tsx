import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeNotification, NotificationType } from "../notificationSlice";
import ClipboardClearButton from "./ClipboardClearButton";

const NotificationDisplay = () => {
  const dispatch = useAppDispatch();
  const { open, type, severity, message } = useAppSelector(
    (state) => state.notification
  );

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        severity={severity}
        action={
          type !== NotificationType.normal ? <ClipboardClearButton /> : null
        }
        onClose={type == NotificationType.normal ? handleClose : undefined}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationDisplay;
