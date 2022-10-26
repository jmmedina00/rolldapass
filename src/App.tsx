import { Container, Paper, Stack, Typography } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import AppBarSettings from "./features/appbar-settings";
import NotificationDisplay from "./features/notification";
import PassConfig from "./features/pass-config";
import PassGenerator from "./features/pass-generator";
import PassManagerPromotion from "./features/pass-manager-promotion";

const baseStyle = {
  marginTop: 3,
  flexGrow: 1,
};

const withDrawerStyle = {
  marginLeft: { xs: "inherit", md: "256px" },
  width: { sx: "100%", md: "calc(100% - 256px)" },
};

const App = () => {
  const settingsOpen = useAppSelector((state) => state.settings.settingsOpen);
  const containerStyles = settingsOpen
    ? { ...baseStyle, ...withDrawerStyle }
    : { ...baseStyle };

  return (
    <Stack direction="column" sx={{ display: "flex" }}>
      <AppBarSettings />

      <Container sx={containerStyles}>
        <Stack direction="column" spacing={3}>
          <Paper elevation={2}>
            <PassGenerator />
          </Paper>
          <Paper>
            <PassConfig />
          </Paper>

          <Typography variant="h5">
            You should use a password manager such as...
          </Typography>
          <PassManagerPromotion />
        </Stack>
      </Container>
      <NotificationDisplay />
    </Stack>
  );
};

export default App;
