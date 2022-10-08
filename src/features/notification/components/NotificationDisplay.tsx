import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";

const NotificationDisplay = () => {
  const [open, setOpen] = useState<boolean>(true);

  const action = <Button size="small">Test</Button>;

  return (
    <Snackbar
      open={open}
      message={"Test"}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert severity="info" action={action}>
        Test
      </Alert>
    </Snackbar>
  );
};

export default NotificationDisplay;
