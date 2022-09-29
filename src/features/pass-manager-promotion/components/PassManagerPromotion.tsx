import { Grid } from "@mui/material";
import { passManagers } from "../constants";
import PassManagerCard from "./PassManagerCard";

const PassManagerPromotion = () => {
  const plainPassManagers = Object.entries(passManagers)
    .map(([_, section]) => section.items)
    .flat();

  const passManagerCards = plainPassManagers.map((info) => (
    <PassManagerCard info={info} />
  ));

  return (
    <Grid container spacing={3}>
      {passManagerCards}
    </Grid>
  );
};

export default PassManagerPromotion;
