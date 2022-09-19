import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const PassManagerPromotion = () => (
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
          <Button href="https://en.wikipedia.org/wiki/Main_Page" fullWidth>
            Go to website
          </Button>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default PassManagerPromotion;
