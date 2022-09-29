import { Box } from "@mui/material";
import { passManagers } from "../constants";
import PassManagerCard from "./PassManagerCard";
import PassManagerSection from "./PassManagerSection";

const PassManagerPromotion = () => {
  const sections = Object.entries(passManagers).map(([key, section]) => (
    <PassManagerSection key={key} section={section} />
  ));

  const flatCards = Object.entries(passManagers)
    .flatMap(([_, section]) => section.items)
    .map((info) => <PassManagerCard key={info.name} info={info} />);

  return <Box>{sections}</Box>;
};

export default PassManagerPromotion;
