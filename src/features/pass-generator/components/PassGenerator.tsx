import { Box } from "@mui/material";
import EntropySelect from "./EntropySelector";

import PassEntropy from "./PassEntropy";
import PassField from "./PassField";

const PassGenerator = () => {
  return (
    <Box p={3}>
      <PassField />
      <PassEntropy />
      <EntropySelect />
    </Box>
  );
};

export default PassGenerator;
