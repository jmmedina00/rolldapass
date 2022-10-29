import { Box } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { Settings } from "../../appbar-settings/constants";
import EntropySelect from "./EntropySelector";

import PassEntropy from "./PassEntropy";
import PassField from "./PassField";

const PassGenerator = () => {
  const entropyEnabled = useAppSelector(
    (state) => state.settings.toggle[Settings.Entropy]
  );

  return (
    <Box p={3}>
      <PassField />
      <PassEntropy />
      {entropyEnabled ? <EntropySelect /> : <div />}
    </Box>
  );
};

export default PassGenerator;
