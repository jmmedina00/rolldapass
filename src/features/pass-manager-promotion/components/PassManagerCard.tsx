import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/hooks";
import { PassManagerInfo } from "../constants";

const PassManagerCard = ({ name, image, url }: PassManagerInfo) => {
  const { t } = useTranslation("promotion");
  const isSettingsOpen = useAppSelector((state) => state.settings.settingsOpen);

  return (
    <Grid item lg={3} md={isSettingsOpen ? 6 : 3} xs={6}>
      <Card sx={{ height: 1, display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" image={image} height="auto" />
        <CardContent
          sx={{
            paddingBottom: 0,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {t("descriptions." + name)}
          </Typography>
          <Button href={url} fullWidth>
            {t("link")}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PassManagerCard;
