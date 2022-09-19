import {
  AppBar,
  Container,
  Icon,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import PassConfig from "./feats/PassConfig";
import PassGenerator from "./feats/PassGenerator";
import PassManagerPromotion from "./feats/PassManagerPromotion";

const App = () => (
  <Stack direction="column">
    <AppBar position="static">
      <Toolbar>
        <Icon sx={{ mr: 3 }}>menu</Icon>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rolldapass
        </Typography>
        <Icon>more_vert</Icon>
      </Toolbar>
    </AppBar>
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
