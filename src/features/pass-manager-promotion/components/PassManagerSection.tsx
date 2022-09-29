import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PromotionSection } from "../constants";
import PassManagerCard from "./PassManagerCard";

const PassManagerSection = ({
  section: { label, items },
}: {
  section: PromotionSection;
}) => {
  const passManagerCards = items.map((info) => (
    <PassManagerCard key={info.name} info={info} />
  ));

  return (
    <Box>
      <Typography variant="h6">{label}</Typography>
      <Grid container spacing={3}>
        {passManagerCards}
      </Grid>
    </Box>
  );
};

export default PassManagerSection;
