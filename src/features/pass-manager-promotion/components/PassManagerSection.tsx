import { Grid, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PromotionSection } from "../constants";
import PassManagerCard from "./PassManagerCard";

const PassManagerSection = ({ label, items }: PromotionSection) => {
  const { t } = useTranslation("promotion");

  const passManagerCards = items.map((info) => (
    <PassManagerCard key={info.name} {...info} />
  ));

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {t("sections." + label)}
      </Typography>
      <Grid container spacing={3}>
        {passManagerCards}
      </Grid>
    </Box>
  );
};

export default PassManagerSection;
