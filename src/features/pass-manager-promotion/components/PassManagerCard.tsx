import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { PassManagerInfo } from "../constants";

const PassManagerCard = ({
  name,
  description,
  image,
  url,
}: PassManagerInfo) => {
  const isSettingsOpen = useAppSelector((state) => state.settings.settingsOpen);

  return (
    <Grid item lg={3} md={isSettingsOpen ? 6 : 3} xs={6}>
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
};

export default PassManagerCard;
