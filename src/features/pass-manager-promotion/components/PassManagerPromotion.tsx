import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";
import { passManagers } from "../constants";
import PassManagerCard from "./PassManagerCard";
import PassManagerSection from "./PassManagerSection";

const PassManagerPromotion = () => {
  const organizeToSections = useAppSelector(
    (state) => state.settings.toggle[Settings.PassManagerOrganized] || false
  );

  const sections = Object.entries(passManagers).map(([key, section]) => (
    <PassManagerSection key={key} {...section} />
  ));

  const flatCards = Object.entries(passManagers)
    .flatMap(([_, section]) => section.items)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((info) => <PassManagerCard key={info.name} {...info} />);

  return organizeToSections ? (
    <Box>{sections}</Box>
  ) : (
    <Grid container spacing={3}>
      {flatCards}
    </Grid>
  );
};

export default PassManagerPromotion;
