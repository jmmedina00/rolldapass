import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

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
          <Box p={3}>
            <TextField
              variant="filled"
              type="password"
              label="Generate your password"
              fullWidth
            />
            <LinearProgress
              variant="determinate"
              value={78}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="overline" align="right" paragraph={true}>
              Entropy: 78 bit
            </Typography>
            <Grid sx={{ textAlign: "right" }}>
              <FormControl>
                <InputLabel>Entropy algorythm</InputLabel>
                <Select
                  label="Entropy algorythm"
                  variant="outlined"
                  value={"zxcvbn"}
                  sx={{ minWidth: 300, textAlign: "left" }}
                >
                  <MenuItem value="zxcvbn">zxcvbn</MenuItem>
                  <MenuItem value="uic">UIC</MenuItem>
                  <MenuItem value="tai">Tai-Password-Strength</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Box>
        </Paper>
        <Paper>
          <Box p={3}>
            <Typography variant="h6">Password length</Typography>
            <Stack spacing={3} direction="row" alignItems="center">
              <Slider
                defaultValue={8}
                valueLabelDisplay="auto"
                min={2}
                max={128}
              />
              <Typography variant="subtitle2">32</Typography>
            </Stack>
            <Typography variant="h6">Character sets</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Chip label="Uppercase (A-Z)" color="default" />
              </Grid>
              <Grid item>
                <Chip label="Lowercase (a-z)" color="default" />
              </Grid>
              <Grid item>
                <Chip label="Numbers (0-9)" color="default" />
              </Grid>
              <Grid item>
                <Chip label="Special characters" color="default" />
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Typography variant="h5">
          You should use a password manager such as...
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component="img"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Wikipedia_logo_v3.svg/480px-Wikipedia_logo_v3.svg.png"
                height="auto"
              />
              <CardContent sx={{ paddingBottom: 0 }}>
                <Typography variant="h6">Wikipedia</Typography>
                <Typography variant="body2">The free enciclopedia</Typography>
                <Button
                  href="https://en.wikipedia.org/wiki/Main_Page"
                  fullWidth
                >
                  Go to website
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  </Stack>
);

export default App;
