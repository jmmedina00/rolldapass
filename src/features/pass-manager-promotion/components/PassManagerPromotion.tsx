import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { passManagers } from "../constants";
import PassManagerCard from "./PassManagerCard";
import PassManagerSection from "./PassManagerSection";

const PassManagerPromotion = () => {
  const organizeToSections = useAppSelector(
    (state) => state.settings.toggle["pass-manager-section"] || false
  );

  const sections = Object.entries(passManagers).map(([key, section]) => (
    <PassManagerSection key={key} section={section} />
  ));

  const flatCards = Object.entries(passManagers)
    .flatMap(([_, section]) => section.items)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((info) => <PassManagerCard key={info.name} info={info} />);

  return organizeToSections ? (
    <Box>{sections}</Box>
  ) : (
    <Grid container spacing={3}>
      {flatCards}
    </Grid>
  );
};

export default PassManagerPromotion;
