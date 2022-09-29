import { Box } from "@mui/material";
import { passManagers } from "../constants";
import PassManagerSection from "./PassManagerSection";

const PassManagerPromotion = () => {
  const sections = Object.entries(passManagers).map(([_, section]) => section);

  const visualSections = sections.map((section) => (
    <PassManagerSection section={section} />
  ));

  return <Box>{visualSections}</Box>;
};

export default PassManagerPromotion;
