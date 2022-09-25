import { Container, Paper, Stack, Typography } from "@mui/material";
import AppBarSettings from "./features/appbar-settings";
import PassConfig from "./features/pass-config";
import PassGenerator from "./features/pass-generator";
import PassManagerPromotion from "./features/pass-manager-promotion";

const App = () => (
  <Stack direction="column">
    <AppBarSettings />

    <Container sx={{ marginTop: 3 }}>
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
  </Stack>
);

export default App;
