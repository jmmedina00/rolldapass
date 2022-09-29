import { Box } from "@mui/material";
import { passManagers } from "../constants";
import PassManagerSection from "./PassManagerSection";

const PassManagerPromotion = () => {
  const sections = Object.entries(passManagers).map(([key, section]) => (
    <PassManagerSection key={key} section={section} />
  ));

  return <Box>{sections}</Box>;
};

export default PassManagerPromotion;
