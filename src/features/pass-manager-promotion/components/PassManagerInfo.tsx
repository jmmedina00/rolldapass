import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { PassManagerInfo } from "../constants";

const PassManagerCard = ({
  info: { name, description, image, url },
}: {
  info: PassManagerInfo;
}) => (
  <Grid item xs={3}>
    <Card>
      <CardMedia component="img" image={image} height="auto" />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Button href={url} fullWidth>
          Go to website
        </Button>
      </CardContent>
    </Card>
  </Grid>
);

export default PassManagerCard;
