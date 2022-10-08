import { Alert, Button, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeNotification, NotificationType } from "../notificationSlice";

const NotificationDisplay = () => {
  const dispatch = useAppDispatch();
  const { open, type, severity, message } = useAppSelector(
    (state) => state.notification
  );

  const handleClose = () => {
    dispatch(closeNotification());
  };

  const action = <Button size="small">Test</Button>;

  return (
    <Snackbar
      open={open}
      message={message}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        severity={severity}
        action={type !== NotificationType.normal ? action : null}
        onClose={type == NotificationType.normal ? handleClose : undefined}
      >
        Test
      </Alert>
    </Snackbar>
  );
};

export default NotificationDisplay;
