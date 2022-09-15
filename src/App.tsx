import { Card, CardContent, Typography } from "@mui/material";

const App = () => (
  <Card sx={{ maxWidth: 400 }}>
    <CardContent>
      <Typography variant="h3" gutterBottom>
        This is a test
      </Typography>
      <Typography variant="body1" gutterBottom>
        Testing MUI library
      </Typography>
    </CardContent>
  </Card>
);

export default App;
