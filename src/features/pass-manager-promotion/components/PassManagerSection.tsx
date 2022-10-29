import { Grid, Typography, Box } from "@mui/material";
import { PromotionSection } from "../constants";
import PassManagerCard from "./PassManagerCard";

const PassManagerSection = ({ label, items }: PromotionSection) => {
  const passManagerCards = items.map((info) => (
    <PassManagerCard key={info.name} {...info} />
  ));

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {label}
      </Typography>
      <Grid container spacing={3}>
        {passManagerCards}
      </Grid>
    </Box>
  );
};

export default PassManagerSection;
